const { Router } = require("express");
const { ProductController } = require("../../http/controllers/admin/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text:
 *                      type: string
 *                      description: content a Large of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: string
 *                      description: category of product
 *                  price:
 *                      type: string
 *                      description: price of product
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                  count:
 *                      type: string
 *                      description: count of product
 *                  image:
 *                      type: file
 *                      description: image of product
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                  width:
 *                      type: string
 *                      description: the width of product packet
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new Product
 */

router.post(`/add`, uploadFile.single('image'), stringToArray('tags'), ProductController.addProduct);

/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get all products
 *          responses:
 *              200:
 *                  description: success
 */

router.get('/list', ProductController.getAllProducts);

module.exports = {
    ProductAdminApiRoutes: router
};