const { Router } = require("express");
const { CategoryRoutes } = require("./category");

const router = Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add, remove, edit and any)
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 * 
 */

router.use(`/category`, CategoryRoutes);

module.exports = {
    AdminRoutes: router
}