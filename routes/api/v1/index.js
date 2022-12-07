const express = require('express');
const router = express.Router();

//api route
router.use('/user', require('./user-action'));
module.exports = router;