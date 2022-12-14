const User = require("mongoose").model("User");
const DailyInfo = require("mongoose").model("DailyInfo");
const ClinicalVisit = require("mongoose").model("ClinicalVisit");
const Alert = require("mongoose").model("Alert");

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      case 401:
        message = "User Doesn't Exist!";
      default:
        message = "something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.index = function (req, res) {
  res.render("index", {
    heading: "Express REST API",
  });
};

exports.create = function (req, res) {
  const user = new User(req.body);
  user.provider = "local";
  user.verified = true;
  user.save((err) => {
    if (err) {
      const message = getErrorMessage(err);
      req.flash("error", message); //save the error into flash memory.
      //return next(err);
      return res.send({
        screen: "error",
        message: "Username already exist!",
      });
    } else {
      return res.json(user);
    }
  });
};

exports.welcome = function (req, res) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  res.status(200).send({
    screen: req.user.username,
  });
};

exports.error = function (req, res) {
  console.log("error - no username");
  if (!req.user) {
    return res.status(200).send({
      screen: "error",
      message: "Username does not exist!",
    });
  }
};

exports.signout = function (req, res) {
  req.logout();
  req.session.destroy();
  return res.status("200").json({ message: "signed out" });
};

exports.isSignedIn = (req, res) => {
  if (!req.user) {
    return res.send({ screen: "auth", role: "auth" }).end();
  }
  return res.send({ screen: req.user._id, role: req.user.role }).end();
};

exports.requiresLogin = function (req, res, next) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  next();
};

exports.isPatient = function (req, res, next) {
  if (req.user && req.user.role === "patient") {
    next();
  } else {
    return res.status(403).send({
      message: "User is not able to create Daily Info",
    });
  }
};

exports.isNurse = function (req, res, next) {
  if (req.user && req.user.role === "nurse") {
    next();
  } else {
    return res.status(403).send({
      message: "User is not able to create Daily Info",
    });
  }
};
//
// Returns all users
exports.list = function (req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

// Returns all patients
exports.listPatient = function (req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  User.find({ role: "patient" }, function (err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};
//'read' controller method to display a user
exports.read = function (req, res) {
  // Use the 'response' object to send a JSON response
  res.json(req.user);
};
//
// 'userByID' controller method to find a user by its id
exports.userByID = function (req, res, next, id) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  User.findOne(
    {
      _id: id,
    },
    (err, user) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.user = user;
        console.log(user);
        // Call the next middleware
        next();
      }
    }
  );
};
//update a user by id
exports.update = function (req, res, next) {
  console.log(req.body);
  User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(user);
  });
};
// delete a user by id
// exports.delete = function (req, res, next) {

//   User.findByIdAndRemove(req.user.id, req.body, function (err, user) {
//     if (err) return next(err);
//     res.json(user);
//   });
// };
//
// delete a user by id
exports.delete = function (req, res, next) {
    var ownerToRemove = req.user.id;
    DailyInfo.deleteMany({ owner: ownerToRemove }, function (err, dailyInfo) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("daily info");
            console.log(dailyInfo);
        }
    });
    ClinicalVisit.deleteMany({ owner: ownerToRemove }, function (err, clinicalVisit) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("clinical visit");
            console.log(clinicalVisit);
        }
    });
    Alert.deleteMany({ owner: ownerToRemove }, function (err, alert) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("alert");
            console.log(alert);
        }
    });

    User.findByIdAndRemove(req.user.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
};
