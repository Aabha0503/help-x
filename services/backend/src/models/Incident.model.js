const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", index: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true, index: true },
    accidentEvent: { type: mongoose.Schema.Types.ObjectId, ref: "AccidentEvent" },
    status: {
      type: String,
      enum: ["pending", "countdown", "cancelled", "verified", "dispatched", "resolved"],
      default: "pending",
      index: true
    },
    severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "low" },
    location: {
      lat: Number,
      lng: Number,
      address: String,
      speedKmph: Number
    },
    countdown: {
      seconds: { type: Number, default: 30 },
      startedAt: Date,
      expiresAt: Date,
      cancelledAt: Date,
      cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      cancelReason: String
    },
    ai: {
      accidentProbability: Number,
      severity: String,
      recommendedAction: String,
      explanation: [String]
    },
    responders: {
      hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
      police: { type: mongoose.Schema.Types.ObjectId, ref: "PoliceStation" }
    },
    timeline: [
      {
        status: String,
        message: String,
        at: { type: Date, default: Date.now },
        actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: true }
);

incidentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Incident", incidentSchema);
