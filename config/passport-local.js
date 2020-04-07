const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

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
        else if (password) {
          
          bcrypt.compare(password, user.password).then(response => {
            
            if (response !== true) {

              console.log("Wrong password");

              return done(null, false, {
                message: "Incorrect password."
              });
            
            } else {

                // If none of the above, return the user data
                console.log("User exists, password correct, authenticated");

                return done(null, user);
      
            }

          })
              
        }
        
           
    });
  }
));

module.exports = passport;
