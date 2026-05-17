# Service Communication

## Primary Flow

1. Firmware sends telemetry to IoT Gateway.
2. IoT Gateway forwards normalized readings to Backend API.
3. Backend persists telemetry and creates a pending incident when readings are suspicious.
4. Backend calls AI Service for accident probability and severity.
5. Backend emits countdown events to Mobile App and Web App through Socket.IO.
6. User may cancel from Mobile App within 30 seconds.
7. Backend escalates uncancelled verified incidents to Notification Service.
8. Notification Service sends alerts to emergency contacts, hospitals, police, and responders.

## Communication Types

- Device to IoT Gateway: MQTT, HTTP, or GSM/GPRS-backed HTTP.
- Backend to AI Service: internal REST API.
- Backend to Notification Service: queue-first event or internal REST API.
- Backend to Web/Mobile: Socket.IO for live updates and REST for CRUD operations.
- Backend to MongoDB: Mongoose models and repositories.
- Background jobs: Redis-backed queues for countdown and notification reliability.
