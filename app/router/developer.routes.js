const { Router } = require("express");
const bcrypt = require('bcrypt');
const createHttpError = require("http-errors");
const { RandomNumberGenerator } = require("../utils/functions");

const router = Router();

/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: developer utils
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hash data with bcrypt
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */

router.get(`/password-hash/:password`, (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.status(200).json(bcrypt.hashSync(password, salt));
});

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: get random number
 *          responses: 
 *              200:
 *                  description: success
 */

router.get(`/random-number`, (req, res, next) => {
    return res.status(200).json(RandomNumberGenerator().toString());
});

module.exports = {
    DeveloperRoutes: router
}