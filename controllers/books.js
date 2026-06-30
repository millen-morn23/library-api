const { ObjectId } = require("mongodb");

// GET all books
const getAllBooks = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const result = await db.collection("books").find();
        const books = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving books."
        });
    }
};

// GET single book
const getSingleBook = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const bookId = new ObjectId(req.params.id);

        const book = await db.collection("books").findOne({
            _id: bookId
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(book);

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid book ID."
        });
    }
};

// POST create a new book
const createBook = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages,
            language: req.body.language,
            publishedYear: req.body.publishedYear,
            available: req.body.available,
            description: req.body.description
        };

        const result = await db.collection("books").insertOne(book);

        res.status(201).json({
            id: result.insertedId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating book."
        });
    }
};

// PUT update a book
const updateBook = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const bookId = new ObjectId(req.params.id);

        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages,
            language: req.body.language,
            publishedYear: req.body.publishedYear,
            available: req.body.available,
            description: req.body.description
        };

        const result = await db.collection("books").replaceOne(
            { _id: bookId },
            updatedBook
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid book ID."
        });
    }
};

// DELETE a book
const deleteBook = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const bookId = new ObjectId(req.params.id);

        const result = await db.collection("books").deleteOne({
            _id: bookId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid book ID."
        });
    }
};

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};