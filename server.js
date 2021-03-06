var express =	 	require('express')
  , path = 		require('path')
  , favicon =	 	require('serve-favicon')
  , logger = 		require('morgan')
  , fs = 		require('fs')
  , cookieParser =	require('cookie-parser')
  , bodyParser =	require('body-parser')
  , passport =		require('passport')
  , session = 		require('express-session')
  , flash = 		require('connect-flash')
  , log = 		require('./server/config/winston')
  , passport = 		require('passport');

var app = express();

app.use(favicon(__dirname + '/app/favicon.unipr.ico'));
app.use(logger('dev'));

app.set('views', __dirname + '/server/views');
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({secret:'azjIOH182us1xi11aScakwqsnda1',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'app/')));

require('./server/routes/routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.error(err);
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err);
});

//PAGINA INIZIALE
app.get('*',function(req,res){
  if(req.user) {
    res.cookie('user', JSON.stringify(req.user.user_info()));
  }
  res.sendFile(__dirname + '/app/index.html');
});


module.exports = app;
