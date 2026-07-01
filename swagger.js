const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Library Management API",
        description: "CSE 341 Library Management API Documentation"
    },
    host: "library-api-bgpy.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);