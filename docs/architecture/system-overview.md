# System Overview

Help-X is organized as a scalable monorepo with independently deployable services.

## Event Flow

1. ESP32/Arduino reads accelerometer, gyroscope, vibration, impact, speed, and GPS data.
2. Firmware sends telemetry to the IoT Gateway using MQTT, HTTP, or GSM-backed APIs.
3. IoT Gateway validates and normalizes telemetry, then forwards suspicious events to the Backend API.
4. Backend creates a pending incident and asks the AI Service to verify accident probability.
5. Mobile app receives a real-time countdown event and allows the user to cancel within 30 seconds.
6. If not cancelled and confidence is high, Backend publishes an emergency dispatch event.
7. Notification Service alerts emergency contacts, hospital, police, and dashboards.
8. Web dashboard tracks incidents, locations, status, and response actions.
