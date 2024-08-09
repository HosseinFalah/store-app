const { StatusCodes } = require("http-status-codes");
const RoleModel = require("../../../../models/roles.model");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller{
    async getAllRoutes(req, res, next) {
        try {
            const roles = await RoleModel.find({});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    };

    async createNewRole(req, res, next) {
        try {
            const { title, permissions } = await addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({ title, permissions });
            if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد")
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "نقش با موفقعیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async removeRole(req, res, next) {
        try {
            const { field } = req.params;
            const role = await this.findRoleWithIdOrTitle(field);
            const removeRoleResult = await RoleModel.deleteOne({ _id: role._id });
            if (!removeRoleResult.deletedCount) throw createHttpError.InternalServerError("حذف نقش انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف نقش با موفقیعت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async findRoleWithTitle(title) {        
        const role = await RoleModel.findOne({ title });
        if (role) throw createHttpError.BadRequest("نقش یا رول قبلا ثبت شده")
    };

    async findRoleWithIdOrTitle(field) {
        let findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
        const role = await RoleModel.findOne(findQuery);
        if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
        return role;
    };
}

module.exports = {
    RoleController: new RoleController()
}