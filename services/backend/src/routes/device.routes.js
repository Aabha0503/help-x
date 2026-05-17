const router = require("express").Router();
const deviceController = require("../controllers/device.controller");

router.patch("/:deviceId/heartbeat", deviceController.heartbeat);

module.exports = router;
