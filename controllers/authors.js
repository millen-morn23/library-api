const { ObjectId } = require("mongodb");

// GET all authors
const getAllAuthors = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const result = await db.collection("authors").find();
        const authors = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(authors);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving authors."
        });
    }
};

// GET single author
const getSingleAuthor = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const authorId = new ObjectId(req.params.id);

        const author = await db.collection("authors").findOne({
            _id: authorId
        });

        if (!author) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(author);

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid author ID."
        });
    }
};

// POST create a new author
const createAuthor = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const author = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            birthYear: req.body.birthYear,
            email: req.body.email,
            genre: req.body.genre,
            biography: req.body.biography
        };

        const result = await db.collection("authors").insertOne(author);

        res.status(201).json({
            id: result.insertedId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating author."
        });
    }
};

// PUT update an author
const updateAuthor = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const authorId = new ObjectId(req.params.id);

        const updatedAuthor = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            birthYear: req.body.birthYear,
            email: req.body.email,
            genre: req.body.genre,
            biography: req.body.biography
        };

        const result = await db.collection("authors").replaceOne(
            { _id: authorId },
            updatedAuthor
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid author ID."
        });
    }
};

// DELETE an author
const deleteAuthor = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const authorId = new ObjectId(req.params.id);

        const result = await db.collection("authors").deleteOne({
            _id: authorId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid author ID."
        });
    }
};

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};