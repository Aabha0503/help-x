const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const vehicleService = require("../services/vehicle.service");

const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.user._id, req.body);
  sendSuccess(res, 201, "Vehicle created", { vehicle });
});

const listVehicles = asyncHandler(async (req, res) => {
  const vehicles = await vehicleService.listVehicles(req.user._id);
  sendSuccess(res, 200, "Vehicles fetched", { vehicles });
});

const registerDevice = asyncHandler(async (req, res) => {
  const device = await vehicleService.registerDevice(req.user._id, req.params.vehicleId, req.body);
  sendSuccess(res, 201, "Device registered to vehicle", { device });
});

module.exports = { createVehicle, listVehicles, registerDevice };
