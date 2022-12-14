// Import the Alert and Login controllers
var Alert = require("../controllers/alert.server.controller");
var login = require("../controllers/login.server.controller");

// Export the routes for the Alert controller
module.exports = function (app) {
// Create an alert
app
.route("/api/alert/create")
.post(login.requiresLogin, login.isPatient, Alert.create);

// Get a list of alerts
app.route("/api/alerts").get(Alert.list);

// Read, update, and delete an alert by its ID
app
.route("/api/alert/:alertId")
.get(Alert.read)
.put(login.requiresLogin, Alert.hasAuthorization, Alert.update)
.delete(login.requiresLogin, Alert.hasAuthorization, Alert.delete);

// Add a middleware to retrieve the alert information by ID
app.param("alertId", Alert.infoByID);
};