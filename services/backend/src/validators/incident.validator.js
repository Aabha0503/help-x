const { z } = require("zod");

const gpsSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  speedKmph: z.number().optional(),
  address: z.string().optional()
});

const accidentCandidateSchema = z.object({
  body: z.object({
    deviceId: z.string().min(1),
    triggerReason: z.string().min(3),
    source: z.enum(["iot", "mobile", "manual", "ai"]).optional(),
    gps: gpsSchema,
    sensorSnapshot: z.record(z.any()).optional()
  })
});

const cancelIncidentSchema = z.object({
  body: z.object({ reason: z.string().max(300).optional() }),
  params: z.object({ incidentId: z.string().min(1) })
});

module.exports = { accidentCandidateSchema, cancelIncidentSchema };
