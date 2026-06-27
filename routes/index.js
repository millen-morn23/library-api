const express = require("express");
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
    res.send("Welcome to the CSE 341 Contacts API");
});

// Contacts Routes
router.use("/contacts", require("./contacts"));

module.exports = router;