# Help-X IoT Gateway

Telemetry ingestion service for ESP32/Arduino devices.

## Folder Purpose

- `src/mqtt` - MQTT broker subscriptions and publish handlers.
- `src/http` - HTTP ingestion endpoints for GSM/GPRS modules.
- `src/parsers` - Device payload normalization and validation.
- `src/services` - Telemetry forwarding, anomaly pre-filtering, and device heartbeat logic.

## Responsibilities

- Accept telemetry from IoT hardware.
- Normalize sensor payloads into backend contracts.
- Detect obvious accident candidates locally before backend processing.
- Handle device heartbeat and connection status.
