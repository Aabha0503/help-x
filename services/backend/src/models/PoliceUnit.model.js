const mongoose = require("mongoose");

const policeUnitSchema = new mongoose.Schema(
  {
    unitCode: { type: String, required: true, unique: true, trim: true },
    stationName: { type: String, required: true, trim: true },
    officerInCharge: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ["available", "assigned", "en_route", "offline"], default: "available", index: true },
    jurisdiction: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },
    currentIncidentCode: String
  },
  { timestamps: true }
);

policeUnitSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("PoliceUnit", policeUnitSchema);
