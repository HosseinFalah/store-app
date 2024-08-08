const { StatusCodes } = require("http-status-codes");

const Controller = require("../../controller");
const PermissionModel = require("../../../../models/permissions.model");

class PermissionController extends Controller{
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    permissions
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    PermissionController: new PermissionController()
}