const express = require("express");
const router = express.Router();
const passport = require("passport");

//importing user controller
const userController = require("../../../controllers/user-controller");

// USER REGISTRATION ROUTE
router.post("/register", userController.registerUser);

// USER LOGIN ROUTE
router.post("/login", userController.createSession);

// RESET PASSWORD ROUTE - requires authentication
router.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  userController.resetPassword
);

// UPDATE USER ROUTE - reqiures autentication
router.post(
  "/update-user",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

// FETCHING ALL USERS ROUTE
router.get("/get", userController.getAllUsers);

module.exports = router;
