const router = require("express").Router();
const incidentController = require("../controllers/incident.controller");
const validate = require("../validators/common.validator");
const { accidentCandidateSchema, cancelIncidentSchema } = require("../validators/incident.validator");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.post("/candidates", validate(accidentCandidateSchema), incidentController.createAccidentCandidate);
router.get("/:incidentId", authenticate, incidentController.getIncident);
router.post("/:incidentId/cancel", authenticate, validate(cancelIncidentSchema), incidentController.cancelIncident);
router.post("/:incidentId/dispatch", authenticate, authorize("admin", "operator"), incidentController.dispatchIncident);

module.exports = router;
