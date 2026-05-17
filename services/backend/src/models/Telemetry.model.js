const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true, index: true },
    deviceId: { type: String, required: true, index: true },
    capturedAt: { type: Date, required: true, index: true },
    gps: {
      lat: Number,
      lng: Number,
      speedKmph: Number,
      altitude: Number,
      accuracyMeters: Number
    },
    accelerometer: { x: Number, y: Number, z: Number, magnitude: Number },
    gyroscope: { x: Number, y: Number, z: Number },
    impact: { vibration: Number, shock: Number, gForce: Number },
    battery: { voltage: Number, percent: Number },
    rawPayload: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

telemetrySchema.index({ device: 1, capturedAt: -1 });

module.exports = mongoose.model("Telemetry", telemetrySchema);
