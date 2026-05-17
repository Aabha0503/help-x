# API Catalog

## Backend API

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/me`
- `POST /api/v1/devices/register`
- `POST /api/v1/telemetry`
- `POST /api/v1/incidents`
- `GET /api/v1/incidents/:id`
- `POST /api/v1/incidents/:id/cancel`
- `POST /api/v1/incidents/:id/confirm`
- `GET /api/v1/responders/nearby`
- `POST /api/v1/notifications/test`

## AI Service API

- `POST /api/v1/predict/accident`
- `GET /api/v1/models/active`
- `GET /health`

## IoT Gateway API

- `POST /api/v1/ingest/telemetry`
- `POST /api/v1/ingest/accident-candidate`
- `GET /health`
