const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../../controllers/user-controller');

//register user route
router.post('/register', userController.registerUser);

//get users
router.get('/get', userController.getAllUsers);

//login user

router.post('/login', userController.createSession);

router.post('/reset-password', passport.authenticate('jwt', {session:false}),userController.resetPassword);

//update user
module.exports = router;