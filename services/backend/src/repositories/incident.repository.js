const Incident = require("../models/Incident.model");

const findById = (id) => Incident.findById(id);
const save = (incident) => incident.save();
const findActiveByDevice = (deviceId) => Incident.findOne({ device: deviceId, status: { $in: ["pending", "countdown", "verified"] } });

module.exports = { findById, save, findActiveByDevice };
