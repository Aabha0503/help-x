const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const env = require("../config/env");

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    relation: { type: String, trim: true },
    priority: { type: Number, default: 1 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin", "operator", "hospital", "police"],
      default: "user"
    },
    emergencyContacts: [emergencyContactSchema],
    medicalProfile: {
      bloodGroup: String,
      allergies: [String],
      conditions: [String]
    },
    pushTokens: [String],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = (password) => bcrypt.hash(password, env.bcryptSaltRounds);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
