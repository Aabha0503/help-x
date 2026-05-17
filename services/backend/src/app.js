const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const requestLogger = require("./middlewares/logging.middleware");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ success: true, service: "help-x-backend", status: "healthy" });
});

app.use(`/api/${env.apiVersion}`, routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
