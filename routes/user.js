const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const controllerUser = require("../controllers/user.js");

router
.route("/signup")
.get(controllerUser.renderSignupForm)
.post(wrapAsync(controllerUser.signup));

router
.route("/login")
.get(controllerUser.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true,
}),
 controllerUser.login
);

router.get("/logout",controllerUser.logout);

module.exports = router;