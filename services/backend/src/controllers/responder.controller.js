const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const Hospital = require("../models/Hospital.model");
const PoliceStation = require("../models/PoliceStation.model");
const { findNearbyResponders } = require("../services/responder.service");

const createHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.create(req.body);
  sendSuccess(res, 201, "Hospital created", { hospital });
});

const createPoliceStation = asyncHandler(async (req, res) => {
  const policeStation = await PoliceStation.create(req.body);
  sendSuccess(res, 201, "Police station created", { policeStation });
});

const nearby = asyncHandler(async (req, res) => {
  const responders = await findNearbyResponders({ lat: Number(req.query.lat), lng: Number(req.query.lng) });
  sendSuccess(res, 200, "Nearby responders fetched", responders);
});

module.exports = { createHospital, createPoliceStation, nearby };
