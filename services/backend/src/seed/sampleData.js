const Alert = require("../models/Alert.model");
const Hospital = require("../models/Hospital.model");
const PoliceUnit = require("../models/PoliceUnit.model");
const User = require("../models/User.model");
const Vehicle = require("../models/Vehicle.model");

const seedSampleData = async () => {
  // The seed is idempotent: it only inserts sample records when a collection is empty.
  // This gives new developers useful dashboard data without overwriting real data.
  let demoUser = await User.findOne({ email: "demo.driver@help-x.local" });

  if (!demoUser) {
    demoUser = await User.create({
      name: "Demo Driver",
      email: "demo.driver@help-x.local",
      phone: "+910000000000",
      passwordHash: await User.hashPassword("ChangeMe123"),
      role: "user",
      emergencyContacts: [{ name: "Emergency Contact", phone: "+911112223334", relation: "Family" }]
    });
  }

  if (demoUser && (await Vehicle.countDocuments()) === 0) {
    await Vehicle.insertMany([
      { owner: demoUser._id, registrationNumber: "DL 04 CX 4581", type: "car", manufacturer: "Hyundai", model: "Creta", color: "Black", year: 2022 },
      { owner: demoUser._id, registrationNumber: "KA 02 MQ 1109", type: "bike", manufacturer: "Honda", model: "Activa", color: "Blue", year: 2021 },
      { owner: demoUser._id, registrationNumber: "MH 12 AB 9021", type: "car", manufacturer: "Tata", model: "Nexon", color: "White", year: 2023 }
    ]);
  }

  if ((await Alert.countDocuments()) === 0) {
    await Alert.insertMany([
      {
        incidentCode: "HX-2048",
        driverName: "Aarav Mehta",
        vehicleNumber: "DL 04 CX 4581",
        severity: "critical",
        status: "countdown",
        location: { lat: 28.6139, lng: 77.209, address: "Ring Road, New Delhi", speedKmph: 0 },
        ai: { confidence: 94, verdict: "likely_accident", explanation: ["High impact force", "Sudden speed drop"] },
        countdown: { seconds: 30, startedAt: new Date(), expiresAt: new Date(Date.now() + 30000) },
        sensors: { impactG: 4.8, vibration: 0.92, rollAngle: 41, suddenStop: true }
      },
      {
        incidentCode: "HX-2047",
        driverName: "Priya Nair",
        vehicleNumber: "KA 02 MQ 1109",
        severity: "high",
        status: "hospital_notified",
        location: { lat: 12.9716, lng: 77.5946, address: "MG Road, Bengaluru", speedKmph: 8 },
        ai: { confidence: 88, verdict: "likely_accident", explanation: ["Roll angle anomaly"] },
        sensors: { impactG: 3.2, vibration: 0.75, rollAngle: 55, suddenStop: true }
      }
    ]);
  }

  if ((await Hospital.countDocuments()) === 0) {
    await Hospital.insertMany([
      {
        name: "Metro Trauma Center",
        phone: "+911140001111",
        email: "dispatch@metrotrauma.local",
        address: "Central Delhi",
        location: { type: "Point", coordinates: [77.21, 28.61] },
        emergencyCapacity: { ambulanceAvailable: true, traumaCare: true, availableBeds: 12 }
      },
      {
        name: "CityCare Hospital",
        phone: "+911140002222",
        email: "emergency@citycare.local",
        address: "South Delhi",
        location: { type: "Point", coordinates: [77.23, 28.58] },
        emergencyCapacity: { ambulanceAvailable: true, traumaCare: true, availableBeds: 4 }
      }
    ]);
  }

  if ((await PoliceUnit.countDocuments()) === 0) {
    await PoliceUnit.insertMany([
      {
        unitCode: "PCR-21",
        stationName: "Central Police Station",
        officerInCharge: "Inspector Sharma",
        phone: "+911100000021",
        status: "assigned",
        jurisdiction: "Central Delhi",
        location: { type: "Point", coordinates: [77.208, 28.612] },
        currentIncidentCode: "HX-2048"
      },
      {
        unitCode: "TRAFFIC-8",
        stationName: "Ring Road Control",
        officerInCharge: "SI Verma",
        phone: "+911100000008",
        status: "available",
        jurisdiction: "Ring Road",
        location: { type: "Point", coordinates: [77.214, 28.618] }
      }
    ]);
  }

  console.log("Sample seed data ready");
};

module.exports = seedSampleData;
