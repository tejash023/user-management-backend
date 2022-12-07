const express = require('express');
const router = express.Router();

//api route for version 0.1
router.use('/v1', require('./v1'));

//exporting router
module.exports = router;