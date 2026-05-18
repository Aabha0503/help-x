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

// ---------------------------------------------------------------------------
// Robust CORS policy (enterprise-grade)
// ---------------------------------------------------------------------------
// Why this is necessary:
// - Codespaces exposes frontend via changing public subdomains (e.g. `*-3000.app.github.dev`).
// - A static CLIENT_ORIGIN alone can become stale when Codespaces regenerates URLs.
// - When `credentials: true` is required, we must echo the exact origin value
//   (cannot use a literal wildcard `*`). Therefore we implement a strict,
//   dynamic allowlist with safe wildcard support for `*.app.github.dev`.
// - We apply CORS before any routes or error handlers so headers cannot be
//   stripped by later middleware and so preflight OPTIONS requests are handled.

// Build options for `cors` middleware. Use a function for `origin` so we can
// perform deterministic allowlist checks (fast Set membership + regex fallback).
const corsOptions = {
  origin: (incomingOrigin, callback) => {
    // Allow requests with no origin (e.g., same-origin requests, curl, server-to-server).
    if (!incomingOrigin) return callback(null, true);

    // Fast path: explicit allowlist (from env/config).
    if (env.allowedOriginsSet.has(incomingOrigin)) return callback(null, true);

    // Allow GitHub Codespaces public URLs (dynamic subdomains under app.github.dev).
    if (env.allowAppGithubDev && env.appGithubDevRegex.test(incomingOrigin)) return callback(null, true);

    // Not allowed by policy — fail the CORS check.
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  exposedHeaders: ["Content-Length"],
  credentials: true,
  // Ensure preflight responses are short and non-blocking.
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS globally and ensure OPTIONS preflight is served for all routes.
// NOTE: we avoid `app.options('*', ...)` because some path-to-regexp versions
// choke on the literal `*`. Use a safe middleware that handles OPTIONS.
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return cors(corsOptions)(req, res, (err) => {
      if (err) return res.status(403).json({ success: false, message: 'CORS origin denied' });
      return res.sendStatus(corsOptions.optionsSuccessStatus || 204);
    });
  }

  return cors(corsOptions)(req, res, (err) => {
    if (err) return res.status(403).json({ success: false, message: 'CORS origin denied' });
    next();
  });
});
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ success: true, service: "help-x-backend", status: "healthy" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "help-x-backend", status: "healthy" });
});

// Ensure every `/api/*` request has explicit CORS headers set. We prefer the
// `cors` middleware above, but we add an explicit, non-destructive header
// middleware here to guarantee the required Access-Control-* headers exist
// for downstream proxies or if additional middleware mutates headers.
app.use('/api', (req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    // If origin is allowed by policy, echo it back. Otherwise, skip setting
    // CORS headers so the global `cors` middleware can handle rejection.
    const allowed = env.allowedOriginsSet.has(origin) || (env.allowAppGithubDev && env.appGithubDevRegex.test(origin));
    if (allowed) {
      // Do not overwrite if already present, but ensure explicit headers exist.
      if (!res.getHeader('Access-Control-Allow-Origin')) res.setHeader('Access-Control-Allow-Origin', origin);
      if (!res.getHeader('Access-Control-Allow-Methods')) res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      const reqHeaders = req.headers['access-control-request-headers'] || 'Content-Type,Authorization,Origin,Accept';
      if (!res.getHeader('Access-Control-Allow-Headers')) res.setHeader('Access-Control-Allow-Headers', reqHeaders);
      if (!res.getHeader('Access-Control-Allow-Credentials')) res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }

  // Respond early to preflight OPTIONS requests for /api/* so they never hit
  // route handlers — this is necessary for some proxies and web debug tools.
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  next();
});

app.use("/api", dashboardApiRoutes);
app.use(`/api/${env.apiVersion}`, routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
