const env = require("../config/env");

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message;
  let details = error.details || null;

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
    details = { field: error.path, value: error.value };
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed";
    details = Object.values(error.errors).map((item) => item.message);
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate resource";
    details = error.keyValue;
  }

  if (env.nodeEnv !== "test") {
    console.error({
      message,
      statusCode,
      path: req.originalUrl,
      method: req.method,
      stack: env.nodeEnv === "development" ? error.stack : undefined
    });
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error" : message,
    details,
    stack: env.nodeEnv === "development" ? error.stack : undefined
  });
};

module.exports = { notFoundHandler, errorHandler };
