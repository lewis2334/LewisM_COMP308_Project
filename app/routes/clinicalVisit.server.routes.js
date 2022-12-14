// This code is importing the ClinicalVisit and login controllers from the specified paths
var ClinicalVisit = require("../controllers/clinicalVisit.server.controller");
var login = require("../controllers/login.server.controller");

// This code is exporting a function that takes in an app parameter
module.exports = function (app) {
// This route allows for the creation of a ClinicalVisit using the create method from the ClinicalVisit controller
// The route requires that the user be logged in and be a nurse
app
.route("/api/clinicalVisit/create")
.post(login.requiresLogin, login.isNurse, ClinicalVisit.create);

// This route allows for the listing of ClinicalVisits using the list method from the ClinicalVisit controller
app.route("/api/clinicalVisits").get(ClinicalVisit.list);

// This route allows for reading, updating, and deleting a ClinicalVisit by its ClinicalVisitId
// The route requires that the user be logged in and have authorization
app
.route("/api/clinicalVisit/:clinicalVisitId")
.get(ClinicalVisit.read)
.put(
login.requiresLogin,
ClinicalVisit.hasAuthorization,
ClinicalVisit.update
)
.delete(
login.requiresLogin,
ClinicalVisit.hasAuthorization,
ClinicalVisit.delete
);
// This route allows for getting info about a ClinicalVisit by its ClinicalVisitId using the infoByID method from the ClinicalVisit controller
app.param("clinicalVisitId", ClinicalVisit.infoByID);
};