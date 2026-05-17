# AI Model Design

## Inputs

- Accelerometer X/Y/Z windows.
- Gyroscope X/Y/Z windows.
- Vibration and shock values.
- Speed before and after suspected impact.
- GPS movement pattern.
- Device orientation change.

## Outputs

- `accidentProbability` from 0 to 1.
- `severity` as low, medium, high, or critical.
- `recommendedAction` as ignore, countdown, or dispatch.
- `explanation` with top contributing signals.

## First Model Strategy

Start with rules plus a classical ML classifier such as Random Forest or XGBoost. Move to time-series models after collecting enough real telemetry.
