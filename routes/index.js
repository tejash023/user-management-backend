const express = require('express');
const router = express.Router();

// API ROUTE
router.use('/api', require('./api'));

module.exports = router;