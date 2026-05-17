# Help-X Backend Service

Node.js + Express backend for Help-X, the AI-based intelligent emergency response and accident detection system.

## Responsibilities

- User registration, login, JWT authentication, and role authorization.
- Vehicle and IoT device registration.
- Telemetry ingestion from the IoT Gateway.
- Accident candidate creation and AI verification orchestration.
- 30-second emergency countdown cancellation workflow.
- Hospital and police responder data management.
- Emergency alert queue records.
- Real-time incident updates using Socket.IO.
- Centralized error handling and request logging.

## Architecture

```text
src/
  app.js                 Express app composition
  server.js              HTTP + Socket.IO bootstrap
  config/                Environment, MongoDB, and socket setup
  controllers/           HTTP handlers for each resource
  middlewares/           Auth, authorization, logging, and errors
  models/                MongoDB/Mongoose schemas
  routes/                Versioned Express route modules
  services/              Business logic and integration clients
  repositories/          Persistence helpers for complex domains
  validators/            Zod request validation schemas
  sockets/               Real-time alert events
  jobs/                  Background countdown/dispatch jobs
  events/                Domain event constants
  utils/                 Shared backend helpers
```

## Main API Groups

- `GET /api/health`
- `GET /api/alerts`
- `POST /api/alerts`
- `GET /api/alerts/:id`
- `GET /api/vehicles`
- `POST /api/vehicles`
- `POST /api/incidents`
- `GET /api/hospitals`
- `GET /api/police-units`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/vehicles`
- `GET /api/v1/vehicles`
- `POST /api/v1/vehicles/:vehicleId/devices`
- `PATCH /api/v1/devices/:deviceId/heartbeat`
- `POST /api/v1/telemetry`
- `POST /api/v1/incidents/candidates`
- `GET /api/v1/incidents/:incidentId`
- `POST /api/v1/incidents/:incidentId/cancel`
- `POST /api/v1/incidents/:incidentId/dispatch`
- `GET /api/v1/responders/nearby?lat=...&lng=...`
- `POST /api/v1/responders/hospitals`
- `POST /api/v1/responders/police-stations`
- `GET /api/v1/emergency-alerts`

## Environment

Copy `.env.example` to `.env` and fill production secrets.

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t helpx-backend .
docker run --env-file .env -p 5000:5000 helpx-backend
```

## Real-Time Events

Clients connect to Socket.IO and may join an incident room:

- `incident:join`
- `incident:leave`
- `incident:countdown_started`
- `incident:updated`
- `incident:alert_dispatched`

## Countdown Workflow

1. IoT Gateway posts an accident candidate.
2. Backend creates an `AccidentEvent` and asks the AI service for verification.
3. Backend creates an `Incident` in `countdown` status.
4. Socket.IO emits `incident:countdown_started`.
5. Mobile app can call `POST /incidents/:id/cancel` within 30 seconds.
6. If not cancelled, a countdown job dispatches hospital, police, and contact alerts.

## Beginner Dashboard API Flow

The dashboard-friendly routes live under `/api`:

1. `server.js` loads `.env`, connects MongoDB Atlas, seeds sample data, then starts port `5000`.
2. `app.js` applies security, CORS, JSON parsing, request logging, health checks, and route mounting.
3. `routes/api.routes.js` maps beginner-friendly endpoints to controllers.
4. `controllers/api.controller.js` handles HTTP request/response flow.
5. `services/api.service.js` performs database operations through Mongoose models.
6. Central async middleware and error handling convert thrown errors into JSON responses.

## Database Flow

1. `config/env.js` loads environment variables from `.env`.
2. `config/database.js` reads `MONGODB_URI` and connects to MongoDB Atlas with Mongoose.
3. Mongoose models in `src/models` define collection structure and indexes.
4. Services call models for create/read operations.
5. Controllers return consistent success responses to the frontend.

## Current Implementation Level

This service is intentionally production-structured but still integration-light. External AI and notification calls have stable service boundaries and can be replaced with real HTTP/queue clients without changing controllers or routes.
