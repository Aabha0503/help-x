# MongoDB Schema Structure

## users
Stores user accounts, roles, emergency contacts, medical profile, notification tokens, and privacy preferences.

## devices
Stores registered vehicle devices, owner relation, firmware version, SIM/network metadata, and last heartbeat.

## telemetry
Stores raw and normalized sensor readings for audit, analytics, and AI improvement.

## incidents
Stores accident lifecycle: candidate, pending countdown, cancelled, verified, dispatched, resolved, AI score, GPS trail, and responder status.

## responders
Stores hospitals, police stations, ambulances, service radius, contact APIs, operating status, and location.

## notifications
Stores all dispatch attempts, channel status, provider response, retry count, and delivery timestamps.

## audit_logs
Stores sensitive actions such as cancellation, manual dispatch, role changes, and responder updates.
