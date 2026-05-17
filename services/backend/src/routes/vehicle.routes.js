const router = require("express").Router();
const vehicleController = require("../controllers/vehicle.controller");
const validate = require("../validators/common.validator");
const { createVehicleSchema, registerDeviceSchema } = require("../validators/vehicle.validator");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);
router.post("/", validate(createVehicleSchema), vehicleController.createVehicle);
router.get("/", vehicleController.listVehicles);
router.post("/:vehicleId/devices", validate(registerDeviceSchema), vehicleController.registerDevice);

module.exports = router;
