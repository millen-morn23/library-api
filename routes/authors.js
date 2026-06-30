const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");

// GET all authors
router.get("/", authorsController.getAllAuthors);

// GET single author
router.get("/:id", authorsController.getSingleAuthor);

// POST create a new author
router.post("/", authorsController.createAuthor);

// PUT update an author
router.put("/:id", authorsController.updateAuthor);

// DELETE an author
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;