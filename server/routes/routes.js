var passport =	require('passport');
var User = require("../controllers/user");

module.exports = function(app) {
  // Define a middleware function to be used for every secured routes
  //- See more at:
  // https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
  var auth = function(req, res, next){
    if (!req.isAuthenticated()) res.send(401);
    else next();
  };

  //INSERISCI VARI ROUTE
  var auth = require("../controllers/auth")(app,passport);

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
  // route to log in
  app.post('/auth/login', passport.authenticate('local-login'), function(req, res) {
    res.send(req.user);
  });
  // route to sign in
  app.post('/auth/signup', passport.authenticate('local-signup'), function(req, res) {
    res.send(req.user);
  });
   // route to log out
  app.post('/auth/logout', function(req, res){
    req.logOut();
    res.send(200);
  });

  //- See more at:
  //  https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

  /*app.post('/auth/login', passport.authenticate('local-login', {
    successRedirect: '/index',
    failureRedirect: '/'
  }));

  app.post('/auth/logout',isLoggedIn,function(req,res){
    res.logout();
  })
*/
  app.route("/user").get(User.getUser);
}
