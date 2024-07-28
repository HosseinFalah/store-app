const { Router } = require("express");
const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = Router();

router.get(`/`, AdminBlogController.getAllBlogs);
router.post(`/add`, uploadFile.single('image'), stringToArray('tags'), AdminBlogController.createBlog);
router.get(`/:id`, AdminBlogController.getBlogById);
router.delete(`/:id`, AdminBlogController.deleteBlogById);
router.patch(`/update/:id`, uploadFile.single('image'), stringToArray('tags'), AdminBlogController.updateBlogById);

module.exports = {
    BlogAdminApiRoutes: router
};