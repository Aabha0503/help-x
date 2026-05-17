const http = require("http");
const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");
const { initializeSocket } = require("./config/socket");
const seedSampleData = require("./seed/sampleData");

const startServer = async () => {
  // Startup flow:
  // 1. Load environment through config/env.
  // 2. Connect to MongoDB Atlas through Mongoose.
  // 3. Seed beginner-friendly sample data if the database is empty.
  // 4. Start the Express HTTP server and attach Socket.IO.
  await connectDatabase();
  await seedSampleData();

  const server = http.createServer(app);
  initializeSocket(server);

  server.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Closing Help-X backend.`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer().catch((error) => {
  console.error("Failed to start Help-X backend", error);
  process.exit(1);
});
