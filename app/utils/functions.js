const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const path = require('path');
const fs = require('fs');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const UserModel = require("../models/users.model");
const { initRedis } = require("./init_redis");

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
    
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سروری"));
            const redisClient = initRedis();
            await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
            resolve(token);
        })
    });
};

function VerifyRefreshToken (token)  {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            const redisClient = initRedis();
            const refreshToken = await redisClient.get(String(user._id) || "key_default");
            if (!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
            if(token === refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
        });
    })
};

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {        
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
}

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic
}