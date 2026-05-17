# Help-X AI Service

Python + FastAPI service for accident verification.

## Folder Purpose

- `app/api/v1` - Versioned prediction and health endpoints.
- `app/core` - Settings, logging, model registry, and startup configuration.
- `app/models` - Model loading wrappers and inference adapters.
- `app/schemas` - Pydantic request and response contracts.
- `app/services` - Feature extraction, prediction, scoring, and explanation logic.
- `app/workers` - Async processing for model training or batch evaluation.
- `data` - Local raw and processed datasets for development.
- `notebooks` - Exploration and model training notebooks.

## Responsibilities

- Receive telemetry windows from backend.
- Extract features from accelerometer, gyroscope, vibration, speed, and GPS data.
- Return accident probability, severity estimate, and explanation fields.
