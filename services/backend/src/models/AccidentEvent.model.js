const mongoose = require("mongoose");

const accidentEventSchema = new mongoose.Schema(
  {
    incident: { type: mongoose.Schema.Types.ObjectId, ref: "Incident", index: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true, index: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", index: true },
    detectedAt: { type: Date, required: true, index: true },
    source: { type: String, enum: ["iot", "mobile", "manual", "ai"], default: "iot" },
    triggerReason: { type: String, required: true },
    sensorSnapshot: mongoose.Schema.Types.Mixed,
    gps: {
      lat: Number,
      lng: Number,
      speedKmph: Number
    },
    ai: {
      requestedAt: Date,
      respondedAt: Date,
      accidentProbability: Number,
      severity: { type: String, enum: ["low", "medium", "high", "critical"] },
      recommendedAction: { type: String, enum: ["ignore", "countdown", "dispatch"] },
      explanation: [String]
    },
    status: { type: String, enum: ["candidate", "verified", "false_positive"], default: "candidate" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccidentEvent", accidentEventSchema);
