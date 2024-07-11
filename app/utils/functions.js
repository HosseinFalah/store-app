const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const UserModel = require("../models/users.model");

const RandomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000);
}

const SignAccessToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);

        const payload = {
            mobile: user.mobile
        };
        
        const options = {
            expiresIn: "1h"
        };
    
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سروری"));
            resolve(token)
        })
    });
};

const SignRefreshToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);

        const payload = {
            mobile: user.mobile
        };
        
        const options = {
            expiresIn: "1y"
        };
    
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سروری"));
            resolve(token)
        })
    });
};

const VerifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            resolve(mobile)
        });
    })
}

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken
}