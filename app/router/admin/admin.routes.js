const { Router } = require("express");
const { CategoryRoutes } = require("./category");
const { BlogAdminApiRoutes } = require("./blog");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add, remove, edit and any)
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 *      -   name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 *      -   name: Blog(Admin-Panel)
 *          description: made blog managment admin panel
 */

router.use(`/category`, CategoryRoutes);
router.use(`/blogs`, VerifyAccessToken, BlogAdminApiRoutes);

module.exports = {
    AdminRoutes: router
}