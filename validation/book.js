const { body, validationResult } = require("express-validator");

const bookValidationRules = () => {
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Title is required."),

        body("author")
            .trim()
            .notEmpty()
            .withMessage("Author is required."),

        body("genre")
            .trim()
            .notEmpty()
            .withMessage("Genre is required."),

        body("isbn")
            .trim()
            .notEmpty()
            .withMessage("ISBN is required."),

        body("publisher")
            .trim()
            .notEmpty()
            .withMessage("Publisher is required."),

        body("pages")
            .isInt({ min: 1 })
            .withMessage("Pages must be a positive number."),

        body("language")
            .trim()
            .notEmpty()
            .withMessage("Language is required."),

        body("publishedYear")
            .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
            .withMessage("Published year must be valid."),

        body("available")
            .isBoolean()
            .withMessage("Available must be true or false."),

        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required.")
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
    bookValidationRules,
    validate
};