export const emergencyAlerts = [
  {
    id: "HX-2048",
    driver: "Aarav Mehta",
    vehicle: "DL 04 CX 4581",
    severity: "critical",
    status: "Countdown active",
    location: "Ring Road, New Delhi",
    time: "18 sec remaining",
    confidence: 94,
    sensors: "High impact + sudden stop"
  },
  {
    id: "HX-2047",
    driver: "Priya Nair",
    vehicle: "KA 02 MQ 1109",
    severity: "high",
    status: "Hospital notified",
    location: "MG Road, Bengaluru",
    time: "2 min ago",
    confidence: 88,
    sensors: "Roll angle anomaly"
  },
  {
    id: "HX-2046",
    driver: "Rohan Singh",
    vehicle: "MH 12 AB 9021",
    severity: "medium",
    status: "Police dispatched",
    location: "Pune Expressway",
    time: "5 min ago",
    confidence: 79,
    sensors: "Abrupt deceleration"
  }
];

export const vehicles = [
  { id: "ESP32-108", plate: "DL 04 CX 4581", driver: "Aarav Mehta", speed: 0, battery: 78, status: "Emergency", signal: "LTE", location: "Ring Road" },
  { id: "ESP32-221", plate: "KA 02 MQ 1109", driver: "Priya Nair", speed: 42, battery: 91, status: "Active", signal: "LTE", location: "MG Road" },
  { id: "ARD-017", plate: "MH 12 AB 9021", driver: "Rohan Singh", speed: 64, battery: 65, status: "Watch", signal: "GSM", location: "Expressway" },
  { id: "ESP32-344", plate: "TN 09 KQ 8321", driver: "Nisha Rao", speed: 35, battery: 84, status: "Active", signal: "LTE", location: "OMR" }
];

export const hospitals = [
  { name: "Metro Trauma Center", distance: "1.8 km", eta: "5 min", capacity: "12 beds", status: "Accepted" },
  { name: "CityCare Hospital", distance: "3.1 km", eta: "8 min", capacity: "4 beds", status: "Pending" },
  { name: "North Emergency Clinic", distance: "4.6 km", eta: "12 min", capacity: "2 beds", status: "Standby" }
];

export const policeUnits = [
  { unit: "PCR-21", station: "Central Police Station", eta: "6 min", status: "Dispatched" },
  { unit: "Traffic-8", station: "Ring Road Control", eta: "9 min", status: "En route" },
  { unit: "Patrol-14", station: "North Division", eta: "13 min", status: "Assigned" }
];
