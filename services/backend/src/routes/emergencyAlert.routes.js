const router = require("express").Router();
const emergencyAlertController = require("../controllers/emergencyAlert.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.get("/", authenticate, authorize("admin", "operator"), emergencyAlertController.listAlerts);

module.exports = router;
