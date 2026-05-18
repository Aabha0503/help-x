const { Server } = require("socket.io");
const env = require("./env");
const { verifyAccessToken } = require("../utils/jwt");
const registerIncidentSocket = require("../sockets/incident.socket");

let io;

const initializeSocket = (httpServer) => {
  // Align Socket.IO CORS with Express CORS allowlist.
  io = new Server(httpServer, {
    cors: {
      origin: (incomingOrigin, callback) => {
        if (!incomingOrigin) return callback(null, true);
        if (env.allowedOriginsSet && env.allowedOriginsSet.has(incomingOrigin)) return callback(null, true);
        if (env.allowAppGithubDev && env.appGithubDevRegex.test(incomingOrigin)) return callback(null, true);
        return callback(new Error('Socket origin not allowed'), false);
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true
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