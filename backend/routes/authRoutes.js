const express = require("express");

const router = express.Router();


const {
 signupUser,
 loginUser,
 logoutUser,
 refreshToken
} = require("../controllers/authController");



router.post(
 "/signup",
 signupUser
);


router.post(
 "/login",
 loginUser
);


router.post(
 "/logout",
 logoutUser
);


router.get(
 "/refresh",
 refreshToken
);



module.exports = router;