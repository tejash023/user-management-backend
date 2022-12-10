const express = require('express');
const router = express.Router();

// ROUTE FOR USER v1
router.use('/v1', require('./v1'));


module.exports = router;