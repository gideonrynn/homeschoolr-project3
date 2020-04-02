//may need to move this to the routes folder

//identify where user is routed if not logged in
module.exports = function(req, res, next) {
  
    if (req.user) {
      return next();
    }
  
    return res.redirect("/");
  };
  