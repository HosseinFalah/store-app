const { Router } = require("express");

const { CategoryAdminApiRoutes } = require("./category");
const { BlogAdminApiRoutes } = require("./blog");
const { ProductAdminApiRoutes } = require("./product");
const { CourseAdminApiRoutes } = require("./course");
const { ChapterAdminApiRoutes } = require("./chapter");

const router = Router();

router.use(`/category`, CategoryAdminApiRoutes);
router.use(`/blogs`, BlogAdminApiRoutes);
router.use(`/products`, ProductAdminApiRoutes);
router.use(`/courses`, CourseAdminApiRoutes);
router.use(`/chapter`, ChapterAdminApiRoutes);

module.exports = {
    AdminRoutes: router
}