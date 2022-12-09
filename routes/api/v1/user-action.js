const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/user-controller');

//register user route
router.post('/register', userController.registerUser);

//get users
router.get('/get', userController.getAllUsers);

//login user

//update user
module.exports = router;