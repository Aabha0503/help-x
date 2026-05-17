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

## Current Implementation Level

This service is intentionally production-structured but still integration-light. External AI and notification calls have stable service boundaries and can be replaced with real HTTP/queue clients without changing controllers or routes.
