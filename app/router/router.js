const { Router } = require("express");
const { homeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const { DeveloperRoutes } = require("./developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");

const router = Router();

router.use('/user', UserAuthRoutes);
router.use(`/admin`, VerifyAccessToken, checkRole('ADMIN'), AdminRoutes);
router.use(`/developer`, DeveloperRoutes);
router.use("/", homeRoutes);

module.exports = {
    AllRoutes: router
}