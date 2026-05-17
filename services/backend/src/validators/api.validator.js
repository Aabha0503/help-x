const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  address: z.string().trim().optional(),
  speedKmph: z.number().min(0).optional()
});

const createAlertSchema = z.object({
  body: z.object({
    incidentCode: z.string().trim().min(3).optional(),
    driverName: z.string().trim().min(2),
    vehicleNumber: z.string().trim().min(3),
    severity: z.enum(["low", "medium", "high", "critical"]).optional(),
    status: z.enum(["new", "countdown", "cancelled", "verified", "hospital_notified", "police_dispatched", "resolved"]).optional(),
    location: locationSchema,
    ai: z
      .object({
        confidence: z.number().min(0).max(100).optional(),
        verdict: z.enum(["pending", "likely_accident", "false_positive"]).optional(),
        explanation: z.array(z.string()).optional()
      })
      .optional(),
    sensors: z
      .object({
        impactG: z.number().optional(),
        vibration: z.number().optional(),
        rollAngle: z.number().optional(),
        suddenStop: z.boolean().optional()
      })
      .optional()
  })
});

const getAlertByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema
  })
});

const createVehicleSchema = z.object({
  body: z.object({
    ownerId: objectIdSchema.optional(),
    registrationNumber: z.string().trim().min(3),
    type: z.enum(["car", "bike", "truck", "bus", "ambulance", "other"]).optional(),
    manufacturer: z.string().trim().optional(),
    model: z.string().trim().optional(),
    color: z.string().trim().optional(),
    year: z.number().int().min(1990).max(2100).optional(),
    insurance: z
      .object({
        provider: z.string().trim().optional(),
        policyNumber: z.string().trim().optional(),
        expiresAt: z.coerce.date().optional()
      })
      .optional()
  })
});

module.exports = {
  createAlertSchema,
  getAlertByIdSchema,
  createVehicleSchema
};
