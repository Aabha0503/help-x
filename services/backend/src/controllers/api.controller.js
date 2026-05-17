const apiService = require("../services/api.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await apiService.listAlerts();
  sendSuccess(res, 200, "Alerts fetched successfully", { alerts });
});

const createAlert = asyncHandler(async (req, res) => {
  const alert = await apiService.createAlert(req.body);
  sendSuccess(res, 201, "Alert created successfully", { alert });
});

const getAlertById = asyncHandler(async (req, res) => {
  const alert = await apiService.getAlertById(req.params.id);
  sendSuccess(res, 200, "Alert fetched successfully", { alert });
});

const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await apiService.listVehicles();
  sendSuccess(res, 200, "Vehicles fetched successfully", { vehicles });
});

const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await apiService.createVehicle(req.body);
  sendSuccess(res, 201, "Vehicle created successfully", { vehicle });
});

const createIncident = asyncHandler(async (req, res) => {
  const incident = await apiService.createIncident(req.body);
  sendSuccess(res, 201, "Incident created successfully", { incident });
});

const getHospitals = asyncHandler(async (req, res) => {
  const hospitals = await apiService.listHospitals();
  sendSuccess(res, 200, "Hospitals fetched successfully", { hospitals });
});

const getPoliceUnits = asyncHandler(async (req, res) => {
  const policeUnits = await apiService.listPoliceUnits();
  sendSuccess(res, 200, "Police units fetched successfully", { policeUnits });
});

module.exports = {
  getAlerts,
  createAlert,
  getAlertById,
  getVehicles,
  createVehicle,
  createIncident,
  getHospitals,
  getPoliceUnits
};
