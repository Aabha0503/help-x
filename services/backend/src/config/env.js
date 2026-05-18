const dotenv = require("dotenv");

dotenv.config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV === "production") {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

// Build a robust environment configuration with a defensive CORS allowlist.
// Requirements:
// - Honor explicit CLIENT_ORIGIN when provided (useful for CI/dev override).
// - Always allow localhost:3000 for local development.
// - Allow GitHub Codespaces public URLs by permitting any subdomain of `app.github.dev`.
// - Expose both a fast lookup Set and flags/helpers for middleware use.
const nodeEnv = process.env.NODE_ENV || "development";
const port = Number(process.env.PORT || 5000);
const apiVersion = process.env.API_VERSION || "v1";

// Explicit client origin override (from .env). Keep as single canonical origin when set.
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

// Base static allowlist entries we always accept.
const baseAllowed = new Set([
  clientOrigin,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  // Add known demo/staging hostnames here if needed in future.
]);

// Allow any subdomain of app.github.dev (Codespaces public URLs).
// We don't add a literal wildcard to the list because `Access-Control-Allow-Origin` must echo
// the actual origin when `credentials: true` is used. Instead, middleware performs a regex test.
const allowAppGithubDev = true;
const appGithubDevRegex = /https:\/\/[a-z0-9-]+-\d+\.app\.github\.dev$/i;

const env = {
  nodeEnv,
  port,
  apiVersion,
  clientOrigin,
  // Expose both structures for fast membership tests and policy checks.
  allowedOriginsSet: baseAllowed,
  allowAppGithubDev,
  appGithubDevRegex,
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