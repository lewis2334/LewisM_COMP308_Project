// This module exports a function that sets up routes for a login system.
// The function takes an express app as a parameter.
module.exports = function (app) {
  // Import the login controller and passport library
  const login = require("../controllers/login.server.controller");
  const passport = require("passport");
  
  // Set up the index page route
  app.route("/").get(login.index);
  
  // Set up the sign up route
  app.route("/api/signup").post(login.create);
  
  // Set up the sign in route using passport for authentication
  app.route("/api/signin").post(
  passport.authenticate("local", {
  successRedirect: "/api/welcome",
  failureRedirect: "/api/error",
  failureFlash: true,
  })
  );
  
  // Set up routes for listing users and patients
  app.get("/users", login.list);
  app.get("/patients", login.listPatient);
  
  // Set up route for checking if a user is signed in
  app.route("/api/read_cookie").get(login.isSignedIn);
  
  // Set up route for successful sign in
  app.route("/api/welcome").get(login.welcome);
  
  // Set up route for failed sign in
  app.route("/api/error").get(login.error);
  
  // Set up the sign out route
  app.route("/api/signout").get(login.signout);
  
  // Set up the 'users' parameterized routes
  app
  .route("/users/:username")
  .get(login.read)
  .put(login.update)
  .delete(login.delete);
  
  // Set up the route parameter for username
  app.param("username", login.userByID);
  };