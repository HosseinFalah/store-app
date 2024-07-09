const { Router } = require("express");
const { homeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");

const router = Router();

router.use('/user', UserAuthRoutes);
router.use("/", homeRoutes);

module.exports = {
    AllRoutes: router
}