const router = require("express").Router();
const telemetryController = require("../controllers/telemetry.controller");

router.post("/", telemetryController.ingestTelemetry);

module.exports = router;
