const env = require("../config/env");

const verifyAccident = async (accidentPayload) => {
  // Replace this placeholder with an HTTP call to the FastAPI AI service during integration.
  // The interface is intentionally stable so incident logic does not depend on model internals.
  if (!env.aiServiceUrl) {
    return { accidentProbability: 0.5, severity: "medium", recommendedAction: "countdown", explanation: ["AI service URL not configured"] };
  }

  return {
    accidentProbability: 0.8,
    severity: "high",
    recommendedAction: "countdown",
    explanation: ["High impact and sudden speed drop detected"]
  };
};

module.exports = { verifyAccident };
