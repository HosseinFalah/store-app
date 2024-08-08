const { StatusCodes } = require("http-status-codes");
const RoleModel = require("../../../../models/roles.model");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");

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

    async findRoleWithTitle(title) {        
        const role = await RoleModel.findOne({ title });
        if (role) throw createHttpError.BadRequest("نقش یا رول قبلا ثبت شده")
    }
}

module.exports = {
    RoleController: new RoleController()
}