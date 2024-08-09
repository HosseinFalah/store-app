const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const Controller = require("../../controller");
const PermissionModel = require("../../../../models/permissions.model");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");

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

    async createNewPermission(req, res, next) {
        try {
            const { name, description } = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithName(name);
            const permission = await PermissionModel.create({ name, description });
            if (!permission) throw createHttpError.InternalServerError("سطح ایجاد نشد")
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "سطح با موفقعیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async removePermission(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionWithID(id);
            const removePermissionResult = await PermissionModel.deleteOne({ _id: id });
            if (!removePermissionResult.deletedCount) throw createHttpError.InternalServerError("دسترسی حذف نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "دسترسی با موفقعیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async findPermissionWithName(name) {        
        const permission = await PermissionModel.findOne({ name });
        if (permission) throw createHttpError.BadRequest("دسترسی قبلا ثبت شده")
    };

    async findPermissionWithID(_id) {
        const permission = await PermissionModel.findOne({ _id });
        if (!permission) throw createHttpError.NotFound("سطح یافت نشد");
        return permission;
    }
}

module.exports = {
    PermissionController: new PermissionController()
}