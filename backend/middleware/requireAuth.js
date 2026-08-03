const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("../utils/createError");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createError("Authorization token required", 401));
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(id).select("-password -refreshToken");

    if (!req.user) {
      return next(createError("User not found", 401));
    }

    next();
  } catch (error) {
    next(createError("Request is not authorized", 401));
  }
};

module.exports = requireAuth;
