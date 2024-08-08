const { Router } = require("express");
const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = Router();

router.get(`/list`, PermissionController.getAllPermissions);
router.post(`/add`, PermissionController.createNewPermission);

module.exports = {
    PermissionAdminApiRoutes: router
}