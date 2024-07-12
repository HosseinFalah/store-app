const { Router } = require("express");
const { homeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const redisClient = require("../utils/init_redis");

const router = Router();

(async () => {
    const value = await redisClient.get('name');
    console.log(value);
})();

router.use('/user', UserAuthRoutes);
router.use("/", homeRoutes);

module.exports = {
    AllRoutes: router
}