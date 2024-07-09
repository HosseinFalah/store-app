const createHttpError = require("http-errors");
const { authShema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator } = require("../../../../utils/functions");
const UserModel = require("../../../../models/users.model");
const { EXPIRESIN, USRE_ROLE } = require("../../../../utils/constans");
const Controller = require("../../controller");

class UserAuthController extends Controller {
    async login(req, res, next) {
        try {
            await authShema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile, code);
            if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
            return res.status(200).json({ 
                data: {
                    statusCode: 200,
                    message: "کد اعتبار سنجی با موفقعیت ارسال شد",
                    code,
                    mobile
                }
            });
        } catch (error) {
            next(createHttpError.BadRequest(error.message));
        }
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: EXPIRESIN
        }

        const result = await this.checkExistUser(mobile);

        if (result) {
            return (await this.updateUser(mobile, { otp }));
        }

        return !!(await UserModel.create({mobile, otp, Rolse: [USRE_ROLE]}));
    }

    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user;
    }

    async updateUser(mobile, data = {}) {
        Object.keys(data).forEach(key => {
            if (["", "", 0, null, undefined, "0", NaN].includes(data[key])) delete data[key];
        });
        const updateResult = await UserModel.updateOne({ mobile }, { $set: data});
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}