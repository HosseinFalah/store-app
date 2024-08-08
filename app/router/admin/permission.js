const { Router } = require("express");
const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = Router();

router.get(`/list`, PermissionController.getAllPermissions);

module.exports = {
    PermissionAdminApiRoutes: router
}