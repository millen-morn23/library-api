const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");
const validation = require("../validation/author");

/*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Get all authors'
    #swagger.description = 'Retrieve all authors from the database.'
*/
router.get("/", authorsController.getAllAuthors);

/*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Get a single author'
    #swagger.description = 'Retrieve one author by its MongoDB ObjectId.'
*/
router.get("/:id", authorsController.getSingleAuthor);

/*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Create a new author'
    #swagger.description = 'Create a new author in the database.'
*/
router.post(
    "/",
    validation.authorValidationRules(),
    validation.validate,
    authorsController.createAuthor
);

/*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Update an author'
    #swagger.description = 'Update an existing author.'
*/
router.put(
    "/:id",
    validation.authorValidationRules(),
    validation.validate,
    authorsController.updateAuthor
);

/*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Delete an author'
    #swagger.description = 'Delete an author from the database.'
*/
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;