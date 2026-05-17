const router = require("express").Router();
const responderController = require("../controllers/responder.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.get("/nearby", responderController.nearby);
router.post("/hospitals", authenticate, authorize("admin", "operator"), responderController.createHospital);
router.post("/police-stations", authenticate, authorize("admin", "operator"), responderController.createPoliceStation);

module.exports = router;
