const db = require("../models/");
const passport = require("../config/passport");
const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const userController = require("../controllers/userauthController");

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the app
  router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
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