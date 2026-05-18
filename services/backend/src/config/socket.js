const { Server } = require("socket.io");
const env = require("./env");
const { verifyAccessToken } = require("../utils/jwt");
const registerIncidentSocket = require("../sockets/incident.socket");

let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.allowedOrigins,
      methods: ["GET", "POST", "PATCH"]
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next();

    try {
      socket.user = verifyAccessToken(token);
      return next();
    } catch (error) {
      return next(new Error("Invalid socket token"));
    }
  });

  io.on("connection", (socket) => {
    registerIncidentSocket(io, socket);
  });

  return io;
};

const getSocketServer = () => io;

module.exports = { initializeSocket, getSocketServer };