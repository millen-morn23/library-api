require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { MongoClient } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Load Passport Configuration
require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Configuration
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware
app.use(express.json());

// Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

// Start the server after connecting to MongoDB
async function startServer() {
    try {
        console.log("🔄 Connecting to MongoDB Atlas...");

        await client.connect();

        console.log("✅ Connected to MongoDB Atlas");

        app.locals.db = client.db(process.env.DB_NAME);

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    }
}

startServer();