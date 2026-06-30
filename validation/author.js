const { body, validationResult } = require("express-validator");

const authorValidationRules = () => {
    return [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("First name is required."),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("Last name is required."),

        body("nationality")
            .trim()
            .notEmpty()
            .withMessage("Nationality is required."),

        body("birthYear")
            .isInt({ min: 1000, max: new Date().getFullYear() })
            .withMessage("Birth year must be valid."),

        body("email")
            .isEmail()
            .withMessage("A valid email is required."),

        body("genre")
            .trim()
            .notEmpty()
            .withMessage("Genre is required."),

        body("biography")
            .trim()
            .notEmpty()
            .withMessage("Biography is required.")
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        errors: errors.array()
    });
};

module.exports = {
    authorValidationRules,
    validate
};