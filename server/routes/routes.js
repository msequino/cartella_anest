var passport =	require('passport');
var User = require("../controllers/user"),
    Auth = require("../controllers/auth"),
    Clinic = require("../controllers/clinic"),
    Group = require("../controllers/group"),
    Doc = require("../controllers/doctor"),
    Patient = require("../controllers/patient"),
    Study = require("../controllers/study"),
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

  /*var isAdmin = function(req, res, next){
    if (!req.isAuthenticated())
      return res.sendStatus(401);
    if (!req.user.isAdmin())
      return res.sendStatus(401);
    next();
  };*/

  // Deny only USER
  var isAdmin = function(req, res, next){
    if (!req.isAuthenticated())
      return res.sendStatus(401);
    if (!req.user.isNotUser() )
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

  app.route("/clinics").get(isAuthenticated,Clinic.getClinics);

  app.route("/roles").get(isAuthenticated,Role.getRoles);

  app.route("/groups").get(isAuthenticated,Group.getGroups);

  app.route("/info").get(isAuthenticated,Patient.getInfo);

  app.route("/info/summary").post(isAuthenticated,Patient.insertSummary);
  app.route("/info/summary/:id").put(isAuthenticated,Patient.updateSummary);
  app.route("/info/risk/:id").post(isAuthenticated,Patient.insertRisk);
  app.route("/info/risk/:id").delete(isAuthenticated,Patient.deleteRisk);
  app.route("/info/consulence/:id").post(isAuthenticated,Patient.insertConsulence);
  app.route("/info/consulence/:id").delete(isAuthenticated,Patient.deleteConsulence);

  app.route("/info/analgesia").post(isAuthenticated,Patient.insertAnalgesia);
  app.route("/info/analgesia/:id").put(isAuthenticated,Patient.updateAnalgesia);
  app.route("/info/team/:id").post(isAuthenticated,Patient.insertTeam);
  app.route("/info/team/:id").delete(isAuthenticated,Patient.deleteTeam);
  app.route("/info/therapy/:id").post(isAuthenticated,Patient.insertTherapy);
  app.route("/info/therapy/:id").delete(isAuthenticated,Patient.deleteTherapy);

  app.route("/info/anestesia").post(isAuthenticated,Patient.insertAnestesia);
  app.route("/info/anestesia/:id").put(isAuthenticated,Patient.updateAnestesia);

  app.route("/info/note").post(isAuthenticated,Patient.insertNote);
  app.route("/info/note/:id").put(isAuthenticated,Patient.updateNote);

  app.route("/info/birth").post(isAuthenticated,Patient.insertBirth);
  app.route("/info/birth/:id").put(isAuthenticated,Patient.updateBirth);

  app.route("/studies").get(isAuthenticated,Study.getStudies);
  app.route("/studies/patient/:id").get(isAuthenticated,Study.getStudyPatient);
  app.route("/studies").post(isAdmin,Study.insertStudy);

}
