const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../../../models/users.model");
const Controller = require("../../controller");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const { search } = req.query;
            const databaseQuery = {};
            if (search) databaseQuery["$text"] = { $search: search };
            const users = await UserModel.find(databaseQuery);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserController: new UserController()
}