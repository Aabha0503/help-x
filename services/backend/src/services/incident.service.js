const env = require("../config/env");
const ApiError = require("../utils/ApiError");
const AccidentEvent = require("../models/AccidentEvent.model");
const Device = require("../models/Device.model");
const Incident = require("../models/Incident.model");
const User = require("../models/User.model");
const { verifyAccident } = require("./aiClient.service");
const { findNearbyResponders } = require("./responder.service");
const { queueEmergencyAlerts } = require("./notificationClient.service");
const { emitIncidentUpdate, emitCountdownStarted } = require("../sockets/incident.socket");

const createAccidentCandidate = async ({ deviceId, triggerReason, sensorSnapshot, gps, source = "iot" }) => {
  const device = await Device.findOne({ deviceId }).populate("owner vehicle");
  if (!device) throw new ApiError(404, "Device not registered");

  const accidentEvent = await AccidentEvent.create({
    device: device._id,
    vehicle: device.vehicle?._id,
    detectedAt: new Date(),
    source,
    triggerReason,
    sensorSnapshot,
    gps
  });

  const aiResult = await verifyAccident({ triggerReason, sensorSnapshot, gps });
  accidentEvent.ai = { requestedAt: new Date(), respondedAt: new Date(), ...aiResult };
  accidentEvent.status = aiResult.accidentProbability >= 0.75 ? "verified" : "candidate";
  await accidentEvent.save();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + env.countdownSeconds * 1000);

  const incident = await Incident.create({
    user: device.owner._id,
    vehicle: device.vehicle?._id,
    device: device._id,
    accidentEvent: accidentEvent._id,
    status: "countdown",
    severity: aiResult.severity || "medium",
    location: gps,
    ai: aiResult,
    countdown: { seconds: env.countdownSeconds, startedAt: now, expiresAt },
    timeline: [{ status: "countdown", message: "Accident candidate verified. Countdown started." }]
  });

  accidentEvent.incident = incident._id;
  await accidentEvent.save();

  emitCountdownStarted(incident);
  return incident;
};

const cancelIncident = async (incidentId, userId, reason) => {
  const incident = await Incident.findById(incidentId);
  if (!incident) throw new ApiError(404, "Incident not found");
  if (!["pending", "countdown"].includes(incident.status)) throw new ApiError(409, "Incident can no longer be cancelled");

  incident.status = "cancelled";
  incident.countdown.cancelledAt = new Date();
  incident.countdown.cancelledBy = userId;
  incident.countdown.cancelReason = reason || "User cancelled false alarm";
  incident.timeline.push({ status: "cancelled", message: incident.countdown.cancelReason, actor: userId });
  await incident.save();

  emitIncidentUpdate(incident);
  return incident;
};

const dispatchIncident = async (incidentId) => {
  const incident = await Incident.findById(incidentId).populate("user");
  if (!incident) throw new ApiError(404, "Incident not found");
  if (incident.status === "cancelled") throw new ApiError(409, "Cancelled incident cannot be dispatched");

  const responders = await findNearbyResponders({ lat: incident.location.lat, lng: incident.location.lng });
  const hospital = responders.hospitals[0];
  const police = responders.policeStations[0];

  incident.status = "dispatched";
  incident.responders.hospital = hospital?._id;
  incident.responders.police = police?._id;
  incident.timeline.push({ status: "dispatched", message: "Emergency alerts queued for responders." });
  await incident.save();

  await queueEmergencyAlerts({ incident, user: incident.user, hospital, police });
  emitIncidentUpdate(incident);
  return incident;
};

const getIncidentById = async (incidentId) => Incident.findById(incidentId).populate("user vehicle device responders.hospital responders.police");

module.exports = { createAccidentCandidate, cancelIncident, dispatchIncident, getIncidentById };
