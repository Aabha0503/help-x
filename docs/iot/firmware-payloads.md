# Firmware Payloads

## Telemetry Payload

```json
{
  "deviceId": "esp32-vehicle-001",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "gps": { "lat": 28.6139, "lng": 77.2090, "speedKmph": 42 },
  "accelerometer": { "x": 0.1, "y": 0.2, "z": 9.8 },
  "gyroscope": { "x": 0.01, "y": 0.02, "z": 0.03 },
  "impact": { "vibration": 0.8, "shock": 1.0 },
  "battery": { "voltage": 3.9, "percent": 84 }
}
```

## Accident Candidate Payload

```json
{
  "deviceId": "esp32-vehicle-001",
  "timestamp": "2026-05-17T10:00:05.000Z",
  "reason": "HIGH_G_FORCE_AND_SUDDEN_STOP",
  "latestTelemetryWindow": []
}
```
