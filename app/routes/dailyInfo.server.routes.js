var DaliyInfo = require("../controllers/dailyInfo.server.controller");
var login = require("../controllers/login.server.controller");

module.exports = function (app) {
  // create dailyInfo
  app
    .route("/api/dailyInfo/create")
    .post(
      // require the user to be logged in
      login.requiresLogin,
      // require the user to be a patient
      login.isPatient,
      // call the create function in the DaliyInfo controller
      DaliyInfo.create
    );

  // to show a list of dailyInfo
  app
    .route("/api/dailyInfos")
    .get(
      // call the list function in the DaliyInfo controller
      DaliyInfo.list
    );

  // read, update, delete dailyInfo by dailyInfo Id
  app
    .route("/api/dailyInfo/:dailyInfoId")
    // get the dailyInfo with the specified id
    .get(DaliyInfo.read)
    // require the user to be logged in
    .put(
      login.requiresLogin,
      // check if the user has authorization to modify the dailyInfo
      DaliyInfo.hasAuthorization,
      // update the dailyInfo
      DaliyInfo.update
    )
    // require the user to be logged in
    .delete(
      login.requiresLogin,
      // check if the user has authorization to delete the dailyInfo
      DaliyInfo.hasAuthorization,
      // delete the dailyInfo
      DaliyInfo.delete
    );
  // bind the dailyInfoId param to the DaliyInfo.infoByID function
  app.param("dailyInfoId", DaliyInfo.infoByID);
};