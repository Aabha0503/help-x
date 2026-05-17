const router = require("express").Router();
const apiController = require("../controllers/api.controller");
const validate = require("../validators/common.validator");
const { createAlertSchema, createVehicleSchema, getAlertByIdSchema } = require("../validators/api.validator");

// Beginner-friendly API routes used by the Help-X dashboard.
// These routes intentionally live at /api/... to match the frontend contract.
router.get("/alerts", apiController.getAlerts);
router.post("/alerts", validate(createAlertSchema), apiController.createAlert);
router.get("/alerts/:id", validate(getAlertByIdSchema), apiController.getAlertById);
router.get("/vehicles", apiController.getVehicles);
router.post("/vehicles", validate(createVehicleSchema), apiController.createVehicle);
router.post("/incidents", validate(createAlertSchema), apiController.createIncident);
router.get("/hospitals", apiController.getHospitals);
router.get("/police-units", apiController.getPoliceUnits);

module.exports = router;
