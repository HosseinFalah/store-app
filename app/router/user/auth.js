const { Router } = require("express");
const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */

/**
 * @swagger
 * /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary:
 *          description:
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses: 
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthrorization
 *              500:
 *                  description: Internal Server Error
 */

router.post(`/login`, UserAuthController.login)

module.exports = {
    UserAuthRoutes: router
}