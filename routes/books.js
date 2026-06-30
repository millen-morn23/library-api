const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const validation = require("../validation/book");

/*
    #swagger.tags = ['Books']
    #swagger.summary = 'Get all books'
    #swagger.description = 'Retrieve all books from the library database.'
*/
router.get("/", booksController.getAllBooks);

/*
    #swagger.tags = ['Books']
    #swagger.summary = 'Get a single book'
    #swagger.description = 'Retrieve one book by its MongoDB ObjectId.'
*/
router.get("/:id", booksController.getSingleBook);

/*
    #swagger.tags = ['Books']
    #swagger.summary = 'Create a new book'
    #swagger.description = 'Add a new book to the library.'
*/
router.post(
    "/",
    validation.bookValidationRules(),
    validation.validate,
    booksController.createBook
);

/*
    #swagger.tags = ['Books']
    #swagger.summary = 'Update a book'
    #swagger.description = 'Update an existing book using its ObjectId.'
*/
router.put(
    "/:id",
    validation.bookValidationRules(),
    validation.validate,
    booksController.updateBook
);

/*
    #swagger.tags = ['Books']
    #swagger.summary = 'Delete a book'
    #swagger.description = 'Delete a book from the library using its ObjectId.'
*/
router.delete("/:id", booksController.deleteBook);

module.exports = router;