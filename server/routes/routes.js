var passport =	require('passport');
var User = require("../controllers/user"),
    Auth = require("../controllers/auth");

module.exports = function(app) {
  // Define a middleware function to be used for every secured routes
  //- See more at:
  // https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
  var isAuthenticated = function(req, res, next){
    if (!req.isAuthenticated())
      return res.sendStatus(401);
    next();
  };

  //INSERISCI VARI ROUTE
  var pass = require("../controllers/pass")(app,passport);

  app.get('/auth/session', isAuthenticated, Auth.getSession);
  app.post('/auth/login', passport.authenticate('local-login'), Auth.login);
  app.post('/auth/signup', passport.authenticate('local-signup'), Auth.signup);
  app.post('/auth/logout', isAuthenticated, Auth.logout);


  app.route("/user").get(User.getUser);
}
