var passport =	require('passport');
var User = require("../controllers/user"),
    Auth = require("../controllers/auth"),
    Clinic = require("../controllers/clinic"),
    Group = require("../controllers/group"),
    Doc = require("../controllers/doctor"),
    Patient = require("../controllers/patient"),
    Role = require("../controllers/role");

module.exports = function(app) {
  // Define a middleware function to be used for every secured routes
  //- See more at:
  // https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
  var isAuthenticated = function(req, res, next){
    if (!req.isAuthenticated())
      return res.sendStatus(401);
    next();
  };

  var isAdmin = function(req, res, next){
    if (!req.isAuthenticated())
      return res.sendStatus(401);
    if (!req.user.isAdmin())
      return res.sendStatus(401);
    next();
  };

  //INSERISCI VARI ROUTE
  var pass = require("../controllers/pass")(app,passport);

  app.get('/auth/session', isAuthenticated, Auth.getSession);
  app.post('/auth/login', passport.authenticate('local-login'), Auth.login);
  app.post('/auth/signup', passport.authenticate('local-signup'), Auth.signup);
  app.post('/auth/logout', isAuthenticated, Auth.logout);

  app.route("/users").get(isAdmin,User.getUsers);
  app.route("/users/:id").get(isAdmin,User.getUser);
  app.route("/user/:username").get(isAuthenticated,User.getUserByUsername);
  app.route("/users").post(isAdmin,User.insertUser);
  app.route("/users/:id").put(isAdmin,User.updateUser);
/*  app.route("/users/:id").delete(isAdmin,User.deactivateUser);*/

  app.route("/doctors").get(isAdmin,Doc.getDoctors);
  app.route("/doctors/:id").get(isAdmin,Doc.getDoctor);
  app.route("/doctors").post(isAdmin,Doc.insertDoctor);
  app.route("/doctors/:id").put(isAdmin,Doc.updateDoctor);
  /*  app.route("/users/:id").delete(isAdmin,User.deactivateUser);*/

  app.route("/patients").get(isAuthenticated,Patient.getPatients);
  app.route("/patients/:id").get(isAuthenticated,Patient.getPatient);
  app.route("/patients").post(isAuthenticated,Patient.insertPatient);
  app.route("/patients/:id").put(isAuthenticated,Patient.updatePatient);
  /*  app.route("/users/:id").delete(isAdmin,User.deactivateUser);*/

  app.route("/clinics").get(Clinic.getClinics);

  app.route("/roles").get(Role.getRoles);

  app.route("/groups").get(Group.getGroups);

}
