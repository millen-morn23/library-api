const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let database = null;

async function connectDB() {
    if (database) {
        return database;
    }

    try {
        console.log("🔄 Connecting to MongoDB Atlas...");

        await client.connect();

        console.log("✅ Connected to MongoDB Atlas");

        database = client.db(process.env.DB_NAME);

        return database;
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!database) {
        throw new Error("Database has not been initialized. Call connectDB() first.");
    }

    return database;
}

module.exports = {
    connectDB,
    getDB
};