const router = require("express").Router();
const homeRoutes = require("./home-routes");
const loadPetRoutes = require("./load-pet-routes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/pets", loadPetRoutes);
router.use("/api", apiRoutes);

module.exports = router;