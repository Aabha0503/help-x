# Help-X Notification Service

Dedicated dispatch service for emergency notifications.

## Folder Purpose

- `src/channels` - SMS, push, email, webhook, and voice call channel abstractions.
- `src/providers` - Twilio, Firebase, SendGrid, hospital API, and police API adapters.
- `src/templates` - Message templates for each emergency type.
- `src/workers` - Queue consumers for reliable retry-based dispatch.

## Responsibilities

- Notify emergency contacts.
- Notify nearby hospitals and police stations.
- Send push notifications to mobile users and dashboard operators.
- Retry failed notifications and record delivery status.
