// Load the express module
const express = require("express");

// Create an express app instance
const app = express();

// Load cors middleware for handling cross-origin requests
const cors = require("cors");

// Load environment variable configuration
require("dotenv").config({ path: "./config.env" });

// Get port number from environment variable or use default 5000
const port = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Parse json request bodies
app.use(express.json());

// Mount record routes
app.use(require("./routes/record"));

// get database driver connection
const dbo = require("./db/conn");

// Listen on port, start server
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});