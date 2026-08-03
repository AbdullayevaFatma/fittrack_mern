const jwt = require("jsonwebtoken");


const createAccessToken = (id) => {
  return jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );
};

const createRefreshToken = (id) => {
  return jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


module.exports = {
  createAccessToken,
  createRefreshToken,
};