const { Router } = require("express");
const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = Router();

router.post(`/add`, CategoryController.addCategory);
router.get(`/parents`, CategoryController.getAllParents);
router.get(`/children/:parent`, CategoryController.getChildOfParents);
router.get(`/all`, CategoryController.getAllCategory);
router.get(`/list-of-all`, CategoryController.getAllCategoryWithoutPopulate);
router.delete(`/remove/:id`, CategoryController.removeCategory);
router.get(`/:id`, CategoryController.getCategoryById);
router.patch(`/update/:id`, CategoryController.editCategory);

module.exports = {
    CategoryAdminApiRoutes: router
};