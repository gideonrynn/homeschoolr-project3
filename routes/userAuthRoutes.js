const db = require("../models");
const passport = require("../config/passport-local");
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;
const { check, validationResult } = require('express-validator');
// const userController = require("../controllers/userauthController");

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the app
  router.post("/login", function(req, res) {

    // pass {session: false} in passport options, so that it wont save the user in the req.login session as we will be using jwt
    passport.authenticate('local', {session: false}, (err, user) => {

      if (err || !user ) {
        // res.statusMessage = "Wrong password or email doesn't exist"
        return res.json({ message: "Wrong password or email doesn't exist" });
          
      }

      // generating a session for a user. This session represents how long a login is good for without having to re-authenticate
      req.login(user, {session: false}, (err) => {

        if (err) {

          res.send({message: "Error at req.login"});

         } else {

          // generate a signed json web token with the specified contents of user object and return it in the response to the client
         jwt.sign(
           { id: user.id},
           'your_jwt_secret',
          (err, token) => {
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


  // if the user does not already exist, and validation on email successful, create account
  router.post("/register", [
  
    check('email').not().isEmpty().withMessage('Please enter valid email address. (ex/ geordi@laf.com)')
          .isEmail().withMessage('Please enter valid email address. (ex/ geordi@laf.com)')
          .normalizeEmail().withMessage('Please enter valid email address. (ex/ geordi@laf.com)'),
    check('password').not().isEmpty().withMessage('Please enter a password.')], 

      function(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
      
          return res.json({ errors: errors.array() });
        } else {

          console.log(req.body);
          let userInfo = req.body;
          //search db for email provided by user
          db.User.findOne({ email: req.body.email })

            .then(user => {
            
              //if a user is found with this email address
              if (user) {

                //send back "already exists" response
                return res.json({ message: "Account with this email already exists" });

              }
              else {
                //otherwise create the user and save credentials, respond with true if successful
                bcrypt.hash(userInfo.password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

                  db.User.create({ 
                    email: userInfo.email, 
                    password: hashedPassword, 
                    parentName: userInfo.parentName, 
                    studentName: userInfo.studentName,
                    userType: userInfo.userType
                  })
                    
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

  // still need this particular route? will need to be checking this when going from page to page in react itself. check against isloggedin 
  router.get("/userinfo", function(req, res) {

    //req user is created once the user logs in and creates a session 
    //if this has not been created (because it does not exist)
    console.log(req.body)
    db.User.findOne({email: req.body.email})

      .then(user => {
        if (user) {
          console.log("found")
        }
        console.log(user.data)
      // otherwise, send back the email and id
      res.json({
        user
      });
    })
  });

module.exports = router; 