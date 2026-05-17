const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  sendSuccess(res, 201, "User registered successfully", result);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  sendSuccess(res, 200, "Login successful", result);
});

const me = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "Current user fetched", { user: authService.sanitizeUser(req.user) });
});

module.exports = { register, login, me };
