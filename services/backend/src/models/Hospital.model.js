const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: String,
    address: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },
    emergencyCapacity: {
      ambulanceAvailable: { type: Boolean, default: false },
      traumaCare: { type: Boolean, default: false },
      availableBeds: { type: Number, default: 0 }
    },
    notificationEndpoint: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
