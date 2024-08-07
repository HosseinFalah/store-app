const { Router } = require("express");

const { CategoryAdminApiRoutes } = require("./category");
const { BlogAdminApiRoutes } = require("./blog");
const { ProductAdminApiRoutes } = require("./product");
const { CourseAdminApiRoutes } = require("./course");
const { ChapterAdminApiRoutes } = require("./chapter");
const { EpisodeAdminApiRoutes } = require("./episode");
const { UserAdminApiRoutes } = require("./user");

const router = Router();

router.use(`/category`, CategoryAdminApiRoutes);
router.use(`/blogs`, BlogAdminApiRoutes);
router.use(`/products`, ProductAdminApiRoutes);
router.use(`/courses`, CourseAdminApiRoutes);
router.use(`/chapter`, ChapterAdminApiRoutes);
router.use(`/episode`, EpisodeAdminApiRoutes);
router.use(`/user`, UserAdminApiRoutes);

module.exports = {
    AdminRoutes: router
}