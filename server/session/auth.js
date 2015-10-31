var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');

module.exports = function(req,res,next){
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use('login', new Strategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log(username);
      // check in mongo if a user with username exists or not
      db.User.findOne({where : { 'username' :  username }}).then(
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false,
                  req.flash('message', 'User Not found.'));
          }
          // User exists but wrong password, log the error
          if (!user.isValidPassword(password)){
            console.log('Invalid Password');
            return done(null, false,
                req.flash('message', 'Invalid Password'));
          }
          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        }
      );
  }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.User.find({where : {id : id}}).then(function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
};
