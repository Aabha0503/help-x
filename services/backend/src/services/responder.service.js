const Hospital = require("../models/Hospital.model");
const PoliceStation = require("../models/PoliceStation.model");

const findNearbyResponders = async ({ lat, lng, maxDistanceMeters = 10000 }) => {
  const geoQuery = {
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: maxDistanceMeters
      }
    },
    isActive: true
  };

  const [hospitals, policeStations] = await Promise.all([
    Hospital.find(geoQuery).limit(5),
    PoliceStation.find(geoQuery).limit(5)
  ]);

  return { hospitals, policeStations };
};

module.exports = { findNearbyResponders };
