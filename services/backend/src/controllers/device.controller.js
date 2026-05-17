const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const Device = require("../models/Device.model");

const heartbeat = asyncHandler(async (req, res) => {
  const device = await Device.findOneAndUpdate(
    { deviceId: req.params.deviceId },
    { lastHeartbeatAt: new Date(), status: "active", lastKnownLocation: req.body.location },
    { new: true }
  );

  sendSuccess(res, 200, "Device heartbeat updated", { device });
});

module.exports = { heartbeat };
