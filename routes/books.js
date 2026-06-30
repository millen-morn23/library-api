const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

// GET all books
router.get("/", booksController.getAllBooks);

// GET single book
router.get("/:id", booksController.getSingleBook);

// POST create a new book
router.post("/", booksController.createBook);

// PUT update a book
router.put("/:id", booksController.updateBook);

// DELETE a book
router.delete("/:id", booksController.deleteBook);

module.exports = router;