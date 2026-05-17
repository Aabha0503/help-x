const http = require("http");
const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");
const { initializeSocket } = require("./config/socket");

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);
  initializeSocket(server);

  server.listen(env.port, () => {
    console.log(`Help-X backend running on port ${env.port}`);
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
