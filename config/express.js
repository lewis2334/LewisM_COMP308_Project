const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");
const passport = require("passport");

module.exports = function () {
  const app = express();

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());


  app.use(methodOverride("_method"));

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret, 
    })
  );

  app.set("views", "./app/views");
  app.set("view engine", "ejs");
  app.engine("html", require("ejs").renderFile);

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  require("../app/routes/alert.server.routes.js")(app);
  require("../app/routes/clinicalVisit.server.routes.js")(app);
  require("../app/routes/dailyInfo.server.routes.js")(app);
  require("../app/routes/login.server.routes.js")(app);
  require("../app/routes/ml.server.routes.js")(app);

  app.use(express.static("./public"));

  return app;
};
