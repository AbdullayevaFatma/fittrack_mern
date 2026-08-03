const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createError = require("../utils/createError");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw createError("All fields must be filled", 400);
  }

  if (!validator.isStrongPassword(password)) {
    throw createError("Password not strong enough", 400);
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw createError("Email already in use", 400);
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw createError("All fields must be filled", 400);
  }

  const user = await this.findOne({
    email,
  });

  if (!user) {
    throw createError("Incorrect email", 401);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError("Incorrect password", 401);
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
