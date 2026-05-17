const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const incidentService = require("../services/incident.service");

const createAccidentCandidate = asyncHandler(async (req, res) => {
  const incident = await incidentService.createAccidentCandidate(req.body);
  sendSuccess(res, 201, "Accident candidate created and countdown started", { incident });
});

const getIncident = asyncHandler(async (req, res) => {
  const incident = await incidentService.getIncidentById(req.params.incidentId);
  sendSuccess(res, 200, "Incident fetched", { incident });
});

const cancelIncident = asyncHandler(async (req, res) => {
  const incident = await incidentService.cancelIncident(req.params.incidentId, req.user._id, req.body.reason);
  sendSuccess(res, 200, "Incident cancelled", { incident });
});

const dispatchIncident = asyncHandler(async (req, res) => {
  const incident = await incidentService.dispatchIncident(req.params.incidentId);
  sendSuccess(res, 200, "Emergency dispatch started", { incident });
});

module.exports = { createAccidentCandidate, getIncident, cancelIncident, dispatchIncident };
