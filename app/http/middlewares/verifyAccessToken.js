const createHttpError = require("http-errors");
const JWT = require('jsonwebtoken');
const UserModel = require("../../models/users.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

const getToken = (headers) => {
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) return token;
    throw createHttpError.Unauthorized('حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید');
}

const VerifyAccessToken = (req, res, next) => {
    try {
        const token = getToken(req.headers);
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw createHttpError.Unauthorized("وارد حساب کاربری خود شوید");
                const { mobile } = payload || {};
                const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
                if (!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد");
                req.user = user;
                console.log(req.user);
                return next();
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error)
    }
}

const checkRole = (role) => {
    return (req, res, next) => {
        try {            
            const user = req.user;
            if (user.Rolse.includes(role)) return next();
            throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    VerifyAccessToken,
    checkRole
}