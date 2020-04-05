const db = require("../models");
const passport = require("../config/passport-local");
const router = require("express").Router();
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
// const userController = require("../controllers/userauthController");

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the app
  router.post("/login", function(req, res) {
    // pass {session: false} in passport options, so that it wont save the user in the req.login session as we will be using jwt
    passport.authenticate('local', {session: false}, (err, user) => {

      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user: user
          });
        }

      // generating a session for a user. This session represents how long a login is good for without having to re-authenticate
     req.login(user, {session: false}, (err) => {
         if (err) {
             res.send({message: "Error at req.login"});
         } else {

          // generate a signed son web token with the contents of user object and return it in the response
        //  console.log("passed req.login");
         const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
        //  console.log("token const set")
        //  console.log(`this is the token ` + token)
         return res.json({user, token});

         }
         
      });

  })(req, res);

  })

 
  // if the user does not already exist, create account
  router.post("/register", function(req, res) {

    //search db for email provided by user
    db.User.findOne({ email: req.body.email })

      .then(user => {

        //if a user is found with this email address
        if (user) {

          //send back "already exists" response
          return res.json({ email: "Account with this email already exists" });

        } else {

          //otherwise create the user and save credentials, respond with true if successful
          db.User.create(req.body)
            .then(() => res.json({success: true, message: "Account created!"}))
            .catch(err => res.status(401).json(err))
          }
  
      })
            
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
    
    if (!req.user) {
      // send back an empty object/no data
      res.json({});
    } else {

      // otherwise, send back the email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

module.exports = router; 