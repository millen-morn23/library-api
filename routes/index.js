const express = require("express");
const router = express.Router();

/*
    #swagger.tags = ['Home']
    #swagger.description = 'Home route for the Library Management API'
*/

// Home Route
router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("Welcome to the Library Management API");
});

// Books Routes
router.use("/books", require("./books"));

// Authors Routes
router.use("/authors", require("./authors"));

module.exports = router;