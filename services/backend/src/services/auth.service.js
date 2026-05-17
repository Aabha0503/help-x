const ApiError = require("../utils/ApiError");
const { signAccessToken } = require("../utils/jwt");
const User = require("../models/User.model");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  emergencyContacts: user.emergencyContacts
});

const register = async ({ name, email, phone, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email is already registered");

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ name, email, phone, passwordHash, role });
  const token = signAccessToken({ sub: user._id.toString(), role: user.role });

  return { user: sanitizeUser(user), token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const matches = await user.comparePassword(password);
  if (!matches) throw new ApiError(401, "Invalid email or password");

  const token = signAccessToken({ sub: user._id.toString(), role: user.role });
  return { user: sanitizeUser(user), token };
};

module.exports = { register, login, sanitizeUser };
