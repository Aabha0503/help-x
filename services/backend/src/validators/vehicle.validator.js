const { z } = require("zod");

const createVehicleSchema = z.object({
  body: z.object({
    registrationNumber: z.string().min(3),
    type: z.enum(["car", "bike", "truck", "bus", "ambulance", "other"]).optional(),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
    year: z.number().optional()
  })
});

const registerDeviceSchema = z.object({
  params: z.object({ vehicleId: z.string().min(1) }),
  body: z.object({
    deviceId: z.string().min(3),
    hardwareType: z.enum(["esp32", "arduino", "prototype"]).optional(),
    firmwareVersion: z.string().optional(),
    simNumber: z.string().optional(),
    networkProvider: z.string().optional()
  })
});

module.exports = { createVehicleSchema, registerDeviceSchema };
