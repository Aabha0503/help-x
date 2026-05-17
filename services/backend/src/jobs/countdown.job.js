const Incident = require("../models/Incident.model");
const { dispatchIncident } = require("../services/incident.service");

const processExpiredCountdowns = async () => {
  const expired = await Incident.find({
    status: "countdown",
    "countdown.expiresAt": { $lte: new Date() }
  }).limit(50);

  for (const incident of expired) {
    await dispatchIncident(incident._id);
  }

  return expired.length;
};

module.exports = { processExpiredCountdowns };
