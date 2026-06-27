const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const result = await db.collection("contacts").find();
        const contacts = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving contacts."
        });
    }
};

// GET single contact
const getSingle = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const contactId = new ObjectId(req.params.id);

        const contact = await db.collection("contacts").findOne({
            _id: contactId
        });

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving contact."
        });
    }
};

module.exports = {
    getAll,
    getSingle
};