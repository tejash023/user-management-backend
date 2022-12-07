const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/user-controller');

//register user route
router.get('/register', userController.registerUser);

//login user

//update user
module.exports = router;