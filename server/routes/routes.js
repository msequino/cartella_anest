var passport =	require('passport');

module.exports = function(app) {

  //INSERISCI VARI ROUTE
  var auth = require("../session/auth")(app,passport);
  app.post('/login',
    passport.authenticate('login', {
      successRedirect: '/loginSuccess',
      failureRedirect: '/loginFailure'
    })
  );


  //PAGINA INIZIALE
  app.get('*',function(req,res){
    console.log(req.user);
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }
    res.sendFile("/index.html");
  });

}
