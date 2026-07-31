const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  
  if (!authorization) {
    return res.status(401).json({
      error: "Authorization token required",
    });
  }

  // Bearer token
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

   
    req.user = await User.findById(id).select("-password -refreshToken");

    if (!req.user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Request is not authorized",
    });
  }
};

module.exports = requireAuth;