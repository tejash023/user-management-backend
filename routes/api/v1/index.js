const express = require("express");
const router = express.Router();

// USER ROUTE
router.use("/user", require("./user-action"));

module.exports = router;
