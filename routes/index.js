const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const userAuthRoutes = require("./userAuthRoutes");

router.use("/api", apiRoutes);
router.use("/api", userAuthRoutes);

module.exports = router;