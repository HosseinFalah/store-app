const { Router } = require("express");
const homeController = require("../../http/controllers/api/home.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: index page route and data
 */

/**
 * @swagger
 * tag: IndexPage
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      responses: 
 *          200:
 *              description: success
 *          404:
 *              description: not found
 *      
 */
router.get('/', homeController.indexPage);

module.exports = {
    homeRoutes: router
}