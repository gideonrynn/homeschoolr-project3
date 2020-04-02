const router = require("express").Router();
const userAuthRoutes = require("./users");

// Routes for user authentication
router.use("/users", userAuthRoutes);

module.exports = router;
