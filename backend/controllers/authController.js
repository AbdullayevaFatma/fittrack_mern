const User = require("../models/User");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

// COOKIE OPTIONS

const cookieOptions = {
  httpOnly: true,
  secure: false, 
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// SIGNUP

const signupUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.signup(
      email,
      password
    );

    const accessToken =
      createAccessToken(user._id);

    const refreshToken =
      createRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    res
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      )
      .status(201)
      .json({
        email:user.email,
        accessToken,
      });

  } catch(error){

    res.status(400).json({
      error:error.message
    });

  }

};


// LOGIN

const loginUser = async(req,res)=>{

  const {
    email,
    password
  } = req.body;

  try{
    const user =
      await User.login(
        email,
        password
      );

    const accessToken =
      createAccessToken(
        user._id
      );

    const refreshToken =
      createRefreshToken(
        user._id
      );

    user.refreshToken =
      refreshToken;

    await user.save();

    res
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      )
      .status(200)
      .json({
        email:user.email,
        accessToken,
      });

  }catch(error){
    res.status(400).json({
      error:error.message
    });
  }
};


// LOGOUT

const logoutUser = async(req,res)=>{

  const cookies =
    req.cookies;

  if(!cookies?.refreshToken){

    return res.sendStatus(204);

  }

  const refreshToken =
    cookies.refreshToken;

  const user =
    await User.findOne({
      refreshToken
    });

  if(user){

    user.refreshToken=null;

    await user.save();

  }

  res.clearCookie(
    "refreshToken",
    cookieOptions
  );

  res.sendStatus(204);

};


//REFRESH TOKEN

const refreshToken = async (req, res) => {

  const token = req.cookies.refreshToken;


  if (!token) {
    return res.status(401).json({
      error: "No refresh token"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(
      decoded.id
    );

    if (!user) {
      return res.status(401).json({
        error:"User not found"
      });
    }


    if (user.refreshToken !== token) {
      return res.status(403).json({
        error:"Invalid refresh token"
      });

    }

    const accessToken =
      createAccessToken(
        user._id
      );

    res.status(200).json({
      email:user.email,
      accessToken
    });

  } catch(error){

    res.status(401).json({
      error:"Invalid refresh token"
    });

  }

};



module.exports={
  signupUser,
  loginUser,
  logoutUser,
  refreshToken
};
