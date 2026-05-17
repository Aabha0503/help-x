const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const EmergencyAlert = require("../models/EmergencyAlert.model");

const listAlerts = asyncHandler(async (req, res) => {
  const alerts = await EmergencyAlert.find().sort({ createdAt: -1 }).limit(100);
  sendSuccess(res, 200, "Emergency alerts fetched", { alerts });
});

module.exports = { listAlerts };
