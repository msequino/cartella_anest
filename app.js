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

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({secret:'sdasicoisasoakdoqwiwqj92190ix11x1',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'app/')));


require('./server/routes/routes.js')(app);

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
