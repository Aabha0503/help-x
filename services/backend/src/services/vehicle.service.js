const ApiError = require("../utils/ApiError");
const Vehicle = require("../models/Vehicle.model");
const Device = require("../models/Device.model");

const createVehicle = async (ownerId, payload) => {
  const vehicle = await Vehicle.create({ ...payload, owner: ownerId });
  return vehicle;
};

const listVehicles = async (ownerId) => Vehicle.find({ owner: ownerId, isActive: true }).sort({ createdAt: -1 });

const registerDevice = async (ownerId, vehicleId, payload) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: ownerId });
  if (!vehicle) throw new ApiError(404, "Vehicle not found");

  return Device.create({ ...payload, owner: ownerId, vehicle: vehicleId });
};

module.exports = { createVehicle, listVehicles, registerDevice };
