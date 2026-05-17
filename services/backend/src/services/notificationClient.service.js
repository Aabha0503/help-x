const EmergencyAlert = require("../models/EmergencyAlert.model");

const queueEmergencyAlerts = async ({ incident, user, hospital, police }) => {
  const alerts = [];

  for (const contact of user.emergencyContacts || []) {
    alerts.push({
      incident: incident._id,
      channel: "sms",
      recipientType: "contact",
      recipient: { name: contact.name, phone: contact.phone },
      message: `Help-X emergency: possible accident detected for ${user.name}. Location: ${incident.location?.lat}, ${incident.location?.lng}`
    });
  }

  if (hospital) {
    alerts.push({
      incident: incident._id,
      channel: hospital.notificationEndpoint ? "webhook" : "sms",
      recipientType: "hospital",
      recipient: { name: hospital.name, phone: hospital.phone, endpoint: hospital.notificationEndpoint },
      message: `Emergency accident alert near ${incident.location?.lat}, ${incident.location?.lng}`
    });
  }

  if (police) {
    alerts.push({
      incident: incident._id,
      channel: police.notificationEndpoint ? "webhook" : "sms",
      recipientType: "police",
      recipient: { name: police.name, phone: police.phone, endpoint: police.notificationEndpoint },
      message: `Police alert: verified accident near ${incident.location?.lat}, ${incident.location?.lng}`
    });
  }

  if (alerts.length === 0) return [];
  return EmergencyAlert.insertMany(alerts);
};

module.exports = { queueEmergencyAlerts };
