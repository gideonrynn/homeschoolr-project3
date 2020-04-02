const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// indicating strategy to be used with passport

passport.use(new LocalStrategy(
  //LocalStrategy expects to find credentials in parameters named username and password, but you can change the defaults below
  {
    // passReqToCallback : true,
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    // When a user tries to sign in this code runs
    db.Users.findOne({
      where: {
        username: username
      }
    }).then(function(user) {
      // If there's no user with the given username return the below message
      if (!user) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      // If password incorrect, return below message
      else if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, user);
    });
  }
));

//Once user logins in, every other request will use "cookie" that identifies the session
//passport will serialize and deserialize user instances to and from the session to support login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //need findById? method?
  done(null, obj);
});

module.exports = passport;
