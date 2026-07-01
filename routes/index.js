const express = require("express");
const router = express.Router();

/*
    #swagger.tags = ['Home']
    #swagger.description = 'Home route for the Library Management API'
*/

router.get("/", (req, res) => {
    /*
        #swagger.summary = 'API Home'
        #swagger.responses[200] = {
            description: 'Library Management API is running successfully.'
        }
    */
    res.send("Welcome to the Library Management API");
});

// Authentication Routes
router.use("/auth", require("./auth"));

// Books Routes
router.use("/books", require("./books"));

// Authors Routes
router.use("/authors", require("./authors"));

module.exports = router;