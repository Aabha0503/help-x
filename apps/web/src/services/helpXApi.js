import apiClient from "./apiClient";

const formatLocation = (location = {}) => {
  if (location.address) return location.address;
  if (typeof location.lat === "number" && typeof location.lng === "number") return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
  return "Location unavailable";
};

const formatRelativeTime = (date) => {
  if (!date) return "Just now";
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMinutes = Math.max(0, Math.round(diffMs / 60000));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes === 1) return "1 min ago";
  return `${diffMinutes} min ago`;
};

const mapAlert = (alert) => ({
  id: alert.incidentCode || alert._id,
  mongoId: alert._id,
  driver: alert.driverName || "Unknown driver",
  vehicle: alert.vehicleNumber || "Unregistered vehicle",
  severity: alert.severity || "medium",
  status: (alert.status || "new").replaceAll("_", " "),
  location: formatLocation(alert.location),
  time: formatRelativeTime(alert.createdAt),
  confidence: alert.ai?.confidence ?? 0,
  sensors: alert.ai?.explanation?.[0] || "Sensor details pending"
});

const mapVehicle = (vehicle) => ({
  id: vehicle._id,
  plate: vehicle.registrationNumber || "Unknown",
  driver: vehicle.owner?.name || "Demo Driver",
  speed: vehicle.lastKnownLocation?.speedKmph ?? 0,
  battery: vehicle.battery?.percent ?? 82,
  status: vehicle.isActive ? "Active" : "Offline",
  signal: vehicle.networkProvider || "LTE",
  location: vehicle.lastKnownLocation?.address || vehicle.model || vehicle.type || "Tracking pending"
});

const mapHospital = (hospital) => ({
  id: hospital._id,
  name: hospital.name,
  distance: "Live",
  eta: hospital.emergencyCapacity?.ambulanceAvailable ? "5 min" : "Standby",
  capacity: `${hospital.emergencyCapacity?.availableBeds ?? 0} beds`,
  status: hospital.emergencyCapacity?.traumaCare ? "Accepted" : "Standby",
  phone: hospital.phone,
  address: hospital.address
});

const mapPoliceUnit = (unit) => ({
  id: unit._id,
  unit: unit.unitCode,
  station: unit.stationName,
  eta: unit.status === "available" ? "Ready" : "6 min",
  status: (unit.status || "offline").replaceAll("_", " "),
  incident: unit.currentIncidentCode || "Unassigned"
});

export const fetchAlerts = async () => {
  const response = await apiClient.get("/alerts");
  return (response.data?.alerts || []).map(mapAlert);
};

export const fetchVehicles = async () => {
  const response = await apiClient.get("/vehicles");
  return (response.data?.vehicles || []).map(mapVehicle);
};

export const fetchHospitals = async () => {
  const response = await apiClient.get("/hospitals");
  return (response.data?.hospitals || []).map(mapHospital);
};

export const fetchPoliceUnits = async () => {
  const response = await apiClient.get("/police-units");
  return (response.data?.policeUnits || []).map(mapPoliceUnit);
};
