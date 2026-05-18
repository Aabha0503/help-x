const dotenv = require("dotenv");

dotenv.config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV === "production") {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  apiVersion: process.env.API_VERSION || "v1",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  allowedOrigins: [
    process.env.CLIENT_ORIGIN || "http://localhost:3000",
    "https://animated-space-fortnight-q7pxwjvjrwpvc9q49-3000.app.github.dev"
  ],
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/helpx",
  jwtSecret: process.env.JWT_SECRET || "development_only_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  countdownSeconds: Number(process.env.COUNTDOWN_SECONDS || 30),
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5002",
  logLevel: process.env.LOG_LEVEL || "info"
};

module.exports = env;
