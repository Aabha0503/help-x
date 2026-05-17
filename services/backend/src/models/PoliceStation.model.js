const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: String,
    jurisdiction: String,
    address: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },
    notificationEndpoint: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

policeStationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("PoliceStation", policeStationSchema);
