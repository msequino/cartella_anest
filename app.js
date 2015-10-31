var express =	 	require('express')
  , path = 		require('path')
  , favicon =	 	require('serve-favicon')
  , logger = 		require('morgan')
  , fs = 		require('fs')
  , cookieParser =	require('cookie-parser')
  , bodyParser =	require('body-parser')
  , passport =	require('passport')
  , session = 		require('express-session')
  , flash = 		require('connect-flash')
  , passport = 		require('passport');

var app = express();

app.use(favicon(__dirname + '/app/favicon.unipr.ico'));
app.use(logger('dev'));

app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({secret:'smsjaodoaid0qkplsqueu390',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'app/')));

//INSERISCI VARI ROUTE

var auth = require("./server/session/auth")(app,passport);
app.post('/login',
  passport.authenticate('login', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

var user = require("./server/controllers/user");
app.route("/user").
  get(user.getUser);

//PAGINA INIZIALE
app.route('/').get(function(req,res){
  if(req.user) {
    res.cookie('user', JSON.stringify(req.user.user_info));
  }
  res.render("index.html");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//app.set('env','nodev');
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log(err);
        res.status(err.status || 500);
        res.render('Pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('Pages/error', {
        message: err.message,
        error: {}
    });

});

module.exports = app;
