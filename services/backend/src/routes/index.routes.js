const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/vehicles", require("./vehicle.routes"));
router.use("/devices", require("./device.routes"));
router.use("/telemetry", require("./telemetry.routes"));
router.use("/incidents", require("./incident.routes"));
router.use("/responders", require("./responder.routes"));
router.use("/emergency-alerts", require("./emergencyAlert.routes"));

module.exports = router;
