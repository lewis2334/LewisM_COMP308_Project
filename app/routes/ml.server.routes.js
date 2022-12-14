module.exports = function (app) {

  // Import the ml controller
  const ml = require("../controllers/ml.server.controller");
  
  // Set up the route for the heart disease prediction
  app.route("/api/ml/heartdisease").post(ml.heartDiseasePredict);
  };