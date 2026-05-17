const Alert = require("../models/Alert.model");
const Vehicle = require("../models/Vehicle.model");
const Hospital = require("../models/Hospital.model");
const PoliceUnit = require("../models/PoliceUnit.model");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");

const listAlerts = () => Alert.find().sort({ createdAt: -1 });

const getAlertById = async (id) => {
  const alert = await Alert.findById(id);
  if (!alert) throw new ApiError(404, "Alert not found");
  return alert;
};

const createAlert = async (payload) => {
  const now = new Date();
  const incidentCode = payload.incidentCode || `HX-${Date.now().toString().slice(-6)}`;

  return Alert.create({
    incidentCode,
    driverName: payload.driverName,
    vehicleNumber: payload.vehicleNumber,
    severity: payload.severity || "high",
    status: payload.status || "countdown",
    location: payload.location,
    ai: {
      confidence: payload.ai?.confidence ?? 85,
      verdict: payload.ai?.verdict || "likely_accident",
      explanation: payload.ai?.explanation || ["Alert created from Help-X API"]
    },
    countdown: {
      seconds: 30,
      startedAt: now,
      expiresAt: new Date(now.getTime() + 30 * 1000)
    },
    sensors: payload.sensors || {}
  });
};

const listVehicles = () => Vehicle.find({ isActive: true }).sort({ createdAt: -1 }).populate("owner", "name phone email");

const getOrCreateDemoOwner = async () => {
  let owner = await User.findOne({ email: "demo.driver@help-x.local" });

  if (!owner) {
    owner = await User.create({
      name: "Demo Driver",
      email: "demo.driver@help-x.local",
      phone: "+910000000000",
      passwordHash: await User.hashPassword("ChangeMe123"),
      role: "user"
    });
  }

  return owner;
};

const createVehicle = async (payload) => {
  const owner = payload.ownerId ? await User.findById(payload.ownerId) : await getOrCreateDemoOwner();
  if (!owner) throw new ApiError(404, "Vehicle owner not found");

  return Vehicle.create({
    owner: owner._id,
    registrationNumber: payload.registrationNumber,
    type: payload.type || "other",
    manufacturer: payload.manufacturer,
    model: payload.model,
    color: payload.color,
    year: payload.year,
    insurance: payload.insurance
  });
};

const createIncident = async (payload) => {
  // Public incident creation stores a dashboard-ready Alert.
  // Deeper IoT/AI workflows can still use the existing /api/v1/incidents routes.
  return createAlert(payload);
};

const listHospitals = () => Hospital.find({ isActive: true }).sort({ name: 1 });

const listPoliceUnits = () => PoliceUnit.find().sort({ status: 1, unitCode: 1 });

module.exports = {
  listAlerts,
  getAlertById,
  createAlert,
  listVehicles,
  createVehicle,
  createIncident,
  listHospitals,
  listPoliceUnits
};
