const env = require("../config/env");

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (env.nodeEnv !== "test") {
    console.error({
      message: error.message,
      statusCode,
      path: req.originalUrl,
      method: req.method,
      stack: env.nodeEnv === "development" ? error.stack : undefined
    });
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error" : error.message,
    details: error.details || null,
    stack: env.nodeEnv === "development" ? error.stack : undefined
  });
};

module.exports = { notFoundHandler, errorHandler };
