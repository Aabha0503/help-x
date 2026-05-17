const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    registrationNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ["car", "bike", "truck", "bus", "ambulance", "other"], default: "other" },
    manufacturer: String,
    model: String,
    color: String,
    year: Number,
    insurance: {
      provider: String,
      policyNumber: String,
      expiresAt: Date
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
