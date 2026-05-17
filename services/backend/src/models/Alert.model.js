const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    incidentCode: { type: String, required: true, unique: true, trim: true },
    driverName: { type: String, required: true, trim: true },
    vehicleNumber: { type: String, required: true, trim: true, uppercase: true },
    severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium", index: true },
    status: {
      type: String,
      enum: ["new", "countdown", "cancelled", "verified", "hospital_notified", "police_dispatched", "resolved"],
      default: "new",
      index: true
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, trim: true },
      speedKmph: Number
    },
    ai: {
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      verdict: { type: String, enum: ["pending", "likely_accident", "false_positive"], default: "pending" },
      explanation: [String]
    },
    countdown: {
      seconds: { type: Number, default: 30 },
      startedAt: Date,
      expiresAt: Date
    },
    sensors: {
      impactG: Number,
      vibration: Number,
      rollAngle: Number,
      suddenStop: Boolean
    }
  },
  { timestamps: true }
);

alertSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Alert", alertSchema);
