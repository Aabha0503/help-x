const ApiError = require("../utils/ApiError");
const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token is required");
  }

  const token = header.split(" ")[1];
  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.sub).select("-passwordHash");

  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid or inactive user");
  }

  req.user = user;
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action"));
  }
  return next();
};

module.exports = { authenticate, authorize };
