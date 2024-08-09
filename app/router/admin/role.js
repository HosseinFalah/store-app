const { Router } = require("express");
const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();

router.get(`/list`, RoleController.getAllRoutes);
router.post(`/add`, stringToArray('permissions'), RoleController.createNewRole);
router.delete(`/remove/:field`, RoleController.removeRole);

module.exports = {
    RoleAdminApiRoutes: router
}