const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const requestLogger = require("./middlewares/logging.middleware");
const dashboardApiRoutes = require("./routes/api.routes");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());

// CORS allows the React dashboard to call the backend during development.
// In production, CLIENT_ORIGIN should be the deployed dashboard URL.
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ success: true, service: "help-x-backend", status: "healthy" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "help-x-backend", status: "healthy" });
});

app.use("/api", dashboardApiRoutes);
app.use(`/api/${env.apiVersion}`, routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
