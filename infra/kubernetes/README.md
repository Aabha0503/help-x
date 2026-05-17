# Kubernetes Infrastructure

Kubernetes manifests are organized by base resources and environment overlays.

- `base` - Shared deployments, services, config maps, and ingress templates.
- `overlays/dev` - Development environment patches.
- `overlays/prod` - Production environment patches.
