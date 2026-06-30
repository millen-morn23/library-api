const express = require("express");
const router = express.Router();

// Temporary route
router.get("/", (req, res) => {
    res.send("Authors route is working.");
});

module.exports = router;