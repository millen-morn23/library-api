const express = require("express");
const passport = require("passport");

const router = express.Router();

/*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login with Google'
*/
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

/*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Google OAuth Callback'
*/
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/login-failed"
    }),
    (req, res) => {
        res.redirect("/auth/profile");
    }
);

/*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'View Logged-in User'
*/
router.get("/profile", (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: "User is not authenticated."
        });
    }

    res.status(200).json(req.user);
});

/*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Logout'
*/
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        res.json({
            message: "Logged out successfully."
        });
    });
});

/*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login Failed'
*/
router.get("/login-failed", (req, res) => {
    res.status(401).json({
        message: "Google authentication failed."
    });
});

module.exports = router;