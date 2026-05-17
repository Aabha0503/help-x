const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", index: true },
    hardwareType: { type: String, enum: ["esp32", "arduino", "prototype"], default: "esp32" },
    firmwareVersion: String,
    simNumber: String,
    networkProvider: String,
    status: { type: String, enum: ["active", "inactive", "maintenance", "lost"], default: "active" },
    lastHeartbeatAt: Date,
    lastKnownLocation: {
      lat: Number,
      lng: Number,
      speedKmph: Number,
      capturedAt: Date
    },
    sensorConfig: {
      impactThreshold: { type: Number, default: 2.5 },
      vibrationThreshold: { type: Number, default: 0.8 },
      reportIntervalSeconds: { type: Number, default: 10 }
    }
  },
  { timestamps: true }
);

deviceSchema.index({ owner: 1, status: 1 });

module.exports = mongoose.model("Device", deviceSchema);
