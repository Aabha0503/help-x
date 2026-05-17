# Deployment Architecture

## Development

Use Docker Compose for MongoDB, Redis, Backend, AI Service, IoT Gateway, and Notification Service.
Run React and React Native locally during active development.

## Production

- Host services in Kubernetes or managed containers.
- Use MongoDB Atlas for production database.
- Use managed Redis for queues and countdown jobs.
- Place Backend API behind an HTTPS load balancer.
- Keep AI Service private inside the service network.
- Use IoT Gateway public endpoint with strict device authentication.
- Store secrets in cloud secret manager, not environment files committed to Git.
- Add centralized logs, metrics, tracing, uptime checks, and alerting.

## High Availability

- Run multiple Backend API replicas.
- Run at least two Notification Service workers.
- Use queue retries for emergency notifications.
- Store every incident state transition for auditability.
