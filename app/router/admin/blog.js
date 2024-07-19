const { Router } = require("express");
const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blog
 *          parameters:
 *              -   in: header
 *                  example: Bearer token ...
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

router.get(`/`, AdminBlogController.getAllBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create Blog document
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *              -   application/json
 *          parameters:
 *              -   in: header
 *                  example: Bearer token ...
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: created
 */

router.post(`/add`, uploadFile.single('image'), stringToArray('tags'), AdminBlogController.createBlog);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog by ID and populate this field
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token ...
 *                  name: access-token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAzNTc4NjMyMSIsImlhdCI6MTcyMTM4MDc5OSwiZXhwIjoxNzIxMzg0Mzk5fQ.vZTCtrJ8gET7do_U1A0PuoPMmPncB_ovsBgGmsGwYrU
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

router.get(`/:id`, AdminBlogController.getBlogById);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: remove blog by ID
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token ...
 *                  name: access-token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAzNTc4NjMyMSIsImlhdCI6MTcyMTM4MDc5OSwiZXhwIjoxNzIxMzg0Mzk5fQ.vZTCtrJ8gET7do_U1A0PuoPMmPncB_ovsBgGmsGwYrU
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

router.delete(`/:id`, AdminBlogController.deleteBlogById);

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: Update Blog by Id
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *              -   application/json
 *          parameters:
 *              -   in: header
 *                  example: Bearer token ...
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              200:
 *                  description: success
 */

router.patch(`/update/:id`, uploadFile.single('image'), stringToArray('tags'), AdminBlogController.updateBlogById);

module.exports = {
    BlogAdminApiRoutes: router
}