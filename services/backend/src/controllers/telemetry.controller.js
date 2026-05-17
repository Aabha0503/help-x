const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const Device = require("../models/Device.model");
const Telemetry = require("../models/Telemetry.model");

const ingestTelemetry = asyncHandler(async (req, res) => {
  const device = await Device.findOne({ deviceId: req.body.deviceId });
  if (!device) throw new ApiError(404, "Device not registered");

  const telemetry = await Telemetry.create({
    device: device._id,
    deviceId: req.body.deviceId,
    capturedAt: req.body.timestamp || new Date(),
    gps: req.body.gps,
    accelerometer: req.body.accelerometer,
    gyroscope: req.body.gyroscope,
    impact: req.body.impact,
    battery: req.body.battery,
    rawPayload: req.body
  });

  sendSuccess(res, 201, "Telemetry stored", { telemetryId: telemetry._id });
});

module.exports = { ingestTelemetry };
