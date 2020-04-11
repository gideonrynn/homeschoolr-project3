const db = require("../models");
const passport = require("../config/passport-local");
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;
const { check, validationResult } = require('express-validator');
require('dotenv').config({path:'../env'})


  // route to verify user credentials and return user data with json token
  router.post("/login", function(req, res) {

    // pass {session: false} in passport options, so that it wont save the user in the req.login session as we will be using jwt
    passport.authenticate('local', {session: false}, (err, user) => {

      //if there is an error in the authentication process or no user found
      if (err || !user ) {
        return res.json({ message: "Wrong password or email doesn't exist" });
          
      }

      // generating a session for a user, though we are setting to false and using the jwt method
      req.login(user, {session: false}, (err) => {

        if (err) {
          res.send({message: "Error at req.login"});

         } else {

          // generate a signed json web token with the specified contents of user object and return it in the response to the client
         jwt.sign(
           { id: user.id}, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) throw err;

            res.json({
              token,
              id: user.id,
              name: user.name,
              email: user.email,
              userType: user.userType
            })

         });
        

        }
         
      });

    })(req, res);

  })


  // route that checks if the user already exists, runs validation on submission, and creates account
  router.post("/register", 
      [check('email').not().isEmpty().withMessage('Please enter valid email address. (ex/ geordi@laf.com)')
        .isEmail().withMessage('Please enter valid email address. (ex/ geordi@laf.com)')
        .normalizeEmail().withMessage('Please enter valid email address. (ex/ geordi@laf.com)'),
      check('password').not().isEmpty().withMessage('Please enter a password.')], 

    function(req, res) {

      // Finds the validation errors in this request and wraps them in an object
      const errors = validationResult(req);

        // if there are errors with the based on the above conditions
        if (!errors.isEmpty()) {
          
          //send them to the client as an array
          return res.json({ errors: errors.array() });

        } else {

          let userInfo = req.body;

          //search db for email provided by user
          db.User.findOne({ email: req.body.email }).then(user => {
            
            //if a user is found with this email address
            if (user) {

              //send back "already exists" response
              return res.json({ message: "Account with this email already exists" });

            }

              else {

                // salt and hash password
                bcrypt.hash(userInfo.password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

                //and create the user and save credentials 
                db.User.create({ 
                  email: userInfo.email, 
                  password: hashedPassword, 
                  parentName: userInfo.parentName, 
                  studentName: userInfo.studentName,
                  userType: userInfo.userType
                })
                    // respond with account created message if successful, or respond with account not created message
                    .then(() => res.status(200).json({success: true, message: "Account created! Please login below."}))
                    .catch(() => res.json({message: "Account was not created. Please try again."}))
                    
                });
              }

            })
      
        }

  });  
 
    
  // Route for logging user out
  router.get("api/logout", function(req, res) {
    req.logout();
    // res.redirect("/");
  });


module.exports = router; 