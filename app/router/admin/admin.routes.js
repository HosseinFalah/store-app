const { Router } = require("express");
const { CategoryAdminApiRoutes } = require("./category");
const { BlogAdminApiRoutes } = require("./blog");
const { ProductAdminApiRoutes } = require("./product");
const { CourseAdminApiRoutes } = require("./course");

const router = Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add, remove, edit and any)
 *      -   name: Course(AdminPanel)
 *          description: managment course section like manage episode, chapter and courses
 *      -   name: Product(AdminPanel)
 *          description: management product route
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 *      -   name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 *      -   name: Blog(Admin-Panel)
 *          description: made blog managment admin panel
 */

router.use(`/category`, CategoryAdminApiRoutes);
router.use(`/blogs`, BlogAdminApiRoutes);
router.use(`/products`, ProductAdminApiRoutes);
router.use(`/courses`, CourseAdminApiRoutes)

module.exports = {
    AdminRoutes: router
}