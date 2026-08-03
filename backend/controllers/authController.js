const User = require("../models/User");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

// COOKIE OPTIONS

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// SIGNUP

const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.signup(email, password);

  const accessToken = createAccessToken(user._id);

  const refreshToken = createRefreshToken(user._id);

  user.refreshToken = refreshToken;

  await user.save();

  res.cookie("refreshToken", refreshToken, cookieOptions).status(201).json({
    email: user.email,
    accessToken,
  });
});

// LOGIN

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  const accessToken = createAccessToken(user._id);

  const refreshToken = createRefreshToken(user._id);

  user.refreshToken = refreshToken;

  await user.save();

  res.cookie("refreshToken", refreshToken, cookieOptions).status(200).json({
    email: user.email,
    accessToken,
  });
});

// LOGOUT

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({
    refreshToken,
  });

  if (user) {
    user.refreshToken = null;

    await user.save();
  }

  res.clearCookie("refreshToken", cookieOptions);

  res.sendStatus(204);
});

// REFRESH TOKEN

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw createError("No refresh token", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw createError("Invalid refresh token", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw createError("User not found", 401);
  }

  if (user.refreshToken !== token) {
    throw createError("Invalid refresh token", 403);
  }

  const accessToken = createAccessToken(user._id);

  res.status(200).json({
    email: user.email,
    accessToken,
  });
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  refreshToken,
};
