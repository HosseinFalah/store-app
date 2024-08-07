const { Router } = require("express");
const { UserController } = require("../../http/controllers/admin/user/user.controller");

const router = Router();

router.get(`/list`, UserController.getAllUsers);
router.patch(`/update-profile`, UserController.updateUserProfile);

module.exports = {
    UserAdminApiRoutes: router
}