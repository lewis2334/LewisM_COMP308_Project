// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load the dependencies
const configureMongoose = require("./config/mongoose");
const configureExpress = require("./config/express");
const configurePassport = require("./config/passport");

// Create the instances
const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();

// Listen on port 5000 and log the status
app.listen(5000);
console.log("Server running at http://localhost:5000/");

// Export the app instance for external use
module.exports = app;