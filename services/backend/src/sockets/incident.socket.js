const INCIDENT_EVENTS = {
  JOIN_INCIDENT: "incident:join",
  LEAVE_INCIDENT: "incident:leave",
  COUNTDOWN_STARTED: "incident:countdown_started",
  UPDATED: "incident:updated",
  ALERT_DISPATCHED: "incident:alert_dispatched"
};

let ioRef;

const registerIncidentSocket = (io, socket) => {
  ioRef = io;

  socket.on(INCIDENT_EVENTS.JOIN_INCIDENT, (incidentId) => {
    socket.join(`incident:${incidentId}`);
  });

  socket.on(INCIDENT_EVENTS.LEAVE_INCIDENT, (incidentId) => {
    socket.leave(`incident:${incidentId}`);
  });
};

const emitCountdownStarted = (incident) => {
  if (!ioRef) return;

  ioRef.to(`incident:${incident._id}`).emit(INCIDENT_EVENTS.COUNTDOWN_STARTED, {
    incidentId: incident._id,
    status: incident.status,
    seconds: incident.countdown.seconds,
    expiresAt: incident.countdown.expiresAt,
    location: incident.location,
    severity: incident.severity
  });

  ioRef.emit(INCIDENT_EVENTS.UPDATED, { incidentId: incident._id, status: incident.status });
};

const emitIncidentUpdate = (incident) => {
  if (!ioRef) return;

  ioRef.to(`incident:${incident._id}`).emit(INCIDENT_EVENTS.UPDATED, incident);
  ioRef.emit(INCIDENT_EVENTS.UPDATED, { incidentId: incident._id, status: incident.status });
};

module.exports = { registerIncidentSocket, emitCountdownStarted, emitIncidentUpdate, INCIDENT_EVENTS };
