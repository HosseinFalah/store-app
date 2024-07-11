const createHttpError = require("http-errors");
const JWT = require('jsonwebtoken');
const UserModel = require("../../models/users.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

const VerifyAccessToken = (req, res, next) => {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    console.log(bearer, token);
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            console.log(err);
            if (err) return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) return next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            console.log(req.user);
            return next();
        })
    } else return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
}

module.exports = {
    VerifyAccessToken
}