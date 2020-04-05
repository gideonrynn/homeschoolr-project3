const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
//for encryption of passwords
const bcrypt = require("bcryptjs");
//10 is the default
const BCRYPT_SALT_ROUNDS = 10;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// indicating type of strategy to be used with passport
passport.use(new LocalStrategy(

  //passport ls expects to find credentials username and password, but you can change the default(s) below
  //we are using email to check the database for an existing user
  {
    // passReqToCallback : true,
    usernameField: 'email'
    // passwordField: 'password'
  },
  function(email, password, done) {
    // console.log(email);
    // console.log(password);

    // When a user tries to sign in, check the database for a record with this email
    db.User.findOne({ email: email})
      .then(function(user) {

      // console.log(user);

      // If no user record exists containing that email address, return the following
      if (!user) {

        console.log("No user found");

        return done(null, false, {
          message: "Account with this email does not exist."
        });

      }
      // If password does not equal password provided by user, return the following
      else if (user.password != password) {

            console.log("Wrong password");

            return done(null, false, {
              message: "Incorrect password."
            });
        }

      // If none of the above, return the user data
      console.log("User exists and password correct");

      return done(null, user);
      
    });
  }
));

//Once user logins in, every other request will use a cookie that identifies the session
//passport will serialize and deserialize user instances to and from the session to support login sessions
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(id, done) {
  
//   //need findById?
//   db.User.findOne({
//     _id: id
// }, '-password -salt', function(err, user) {
//     done(err, user);
// })
// });

// allows only requests with valid tokens to access some special routes needing authentication
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
function (jwtPayload, cb) {

  console.log("jwt strategy running");
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return db.User.findOneById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));

module.exports = passport;
