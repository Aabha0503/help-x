const mongoose = require("mongoose");

const emergencyAlertSchema = new mongoose.Schema(
  {
    incident: { type: mongoose.Schema.Types.ObjectId, ref: "Incident", required: true, index: true },
    channel: { type: String, enum: ["sms", "push", "email", "webhook", "voice"], required: true },
    recipientType: { type: String, enum: ["contact", "hospital", "police", "operator"], required: true },
    recipient: {
      name: String,
      phone: String,
      email: String,
      endpoint: String
    },
    message: { type: String, required: true },
    status: { type: String, enum: ["queued", "sent", "failed", "delivered"], default: "queued", index: true },
    providerResponse: mongoose.Schema.Types.Mixed,
    attempts: { type: Number, default: 0 },
    lastAttemptAt: Date,
    deliveredAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
