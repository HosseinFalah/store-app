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
 * /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel with phone nunmber
 *          description: one time passowrd OTP Login
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

router.post(`/get-otp`, UserAuthController.getOTP);

/**
 * @swagger
 * /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code mobile expires date
 *          parameters: 
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
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
router.post(`/check-otp`, UserAuthController.checkOTP);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new token and refresh token
 *          description: refresh token
 *          parameters:
 *              -   in: formData
 *                  required: true
 *                  type: string
 *                  name: refreshToken
 *          responses:
 *              200:
 *                  description: success
 */
router.post(`/refresh-token`, UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
}