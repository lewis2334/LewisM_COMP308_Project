const config = require("./config");
const mongoose = require("mongoose");

// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error");
    });

  // Load the models
  require("../app/models/user.server.model");
  require("../app/models/alert.server.model");
  require("../app/models/clinicalVisit.server.model");
  require("../app/models/dailyInfo.server.model");

  // Return the Mongoose connection instance
  return db;
};
