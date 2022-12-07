const express = require('express');
const router = express.Router();

//api route
router.use('/v1', require('./v1'));
module.exports = router;