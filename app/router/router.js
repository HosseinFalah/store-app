const { Router } = require("express");
const { homeRoutes } = require("./api");

const router = Router();

router.use("/", homeRoutes);

module.exports = {
    AllRoutes: router
}