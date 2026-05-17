# Microservice Breakdown

## Backend API
Owns users, devices, incidents, responders, authorization, and the main incident workflow.

## IoT Gateway
Owns telemetry ingestion from devices and converts hardware payloads into backend-safe API contracts.

## AI Service
Owns accident verification, severity estimation, model loading, and feature extraction.

## Notification Service
Owns emergency contact, hospital, police, push, SMS, email, webhook, and retryable dispatch logic.

## Web App
Operator-facing dashboard for monitoring, maps, escalation, and incident management.

## Mobile App
User-facing app for emergency countdown cancellation, live location, profile, emergency contacts, and incident updates.

## Shared Package
Defines common constants, status names, event names, and data contracts used across JavaScript modules.
