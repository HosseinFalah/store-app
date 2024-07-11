const createHttpError = require("http-errors");
const { getOTPSchema, checkOTPSchema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const UserModel = require("../../../../models/users.model");
const { EXPIRESIN, USRE_ROLE } = require("../../../../utils/constans");
const Controller = require("../../controller");

class UserAuthController extends Controller {
    async getOTP(req, res, next) {
        try {
            await getOTPSchema.validateAsync(req.body);
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

    async checkOTP(req, res, next) {
        try {
            await checkOTPSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({ mobile });
            if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
            if (user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");
            const now = Date.now();
            if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const mobile = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({ mobile });
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            });
        } catch (error) {
            next(error)
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