# Help-X

Help-X is an AI-based intelligent emergency response and accident detection system.

It combines ESP32/Arduino sensor telemetry, GPS tracking, AI accident verification, a Node.js cloud backend, React dashboard, React Native mobile app, and automated notification workflows for hospitals, police, and emergency contacts.

## Monorepo Modules

- `apps/web` - React + Tailwind emergency operations dashboard.
- `apps/mobile` - React Native app for riders/drivers, countdown cancellation, live status, and emergency contacts.
- `services/backend` - Node.js + Express API, authentication, incident lifecycle, MongoDB models, and real-time sockets.
- `services/ai-service` - Python + FastAPI service for accident verification and model inference.
- `services/iot-gateway` - Dedicated ingestion layer for ESP32/Arduino telemetry over MQTT/HTTP/GSM bridges.
- `services/notification-service` - SMS, push, email, hospital, and police dispatch orchestration.
- `firmware` - ESP32 and Arduino firmware structure for sensors, GPS, GSM, and emergency button logic.
- `packages/shared` - Shared constants, API types, validation rules, and event names.
- `infra` - Docker, Kubernetes, and Terraform deployment assets.
- `docs` - Architecture, API, AI, IoT, and deployment documentation.

## Recommended Build Order

1. Backend API and MongoDB schemas.
2. IoT gateway telemetry ingestion.
3. Firmware sensor payload publishing.
4. Mobile countdown and cancel workflow.
5. AI verification endpoint.
6. Notification service integrations.
7. Web dashboard for monitoring and response.

## Safety Note

Help-X is emergency-response software. Production deployments should include redundancy, audit logs, privacy controls, manual override, monitored queues, and integration agreements with local emergency authorities.
