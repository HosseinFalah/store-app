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

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")));
    } else {
        return [];
    }
};

function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    let nullishData = ["", " ", 0, "0", null, undefined];

    Object.keys(data).forEach(key => {
        if (blackListFields.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim()); 
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key] 
        if (nullishData.includes(data[key])) delete data[key];
    });
};

function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
};

function setFeatures(body) {
    const { colors, width, weight, height, length } = body;
    let features = {};
    features.colors = colors;
    
    if(!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {                
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
        if (!length) features.length = 0;
        else features.length = +length;
    };

    return features;
}

function getTime(time) {
    let total = Math.round(time) / 60;
    let [min, percentage] = String(total).split(".");
    if(percentage == undefined) percentage = "0"
    let sec = Math.round(((percentage.substring(0,2)) * 60) / 100);
    let hour = 0;
    if (min > 59) {
      total = min / 60;
      [hour , percentage] = String(total).split(".")
      if(percentage == undefined) percentage = "0"
      min = Math.round(((percentage.substring(0,2)) * 60) / 100);
    }
    if(hour < 10 ) hour = `0${hour}` ;
    if(min < 10) min = `0${min}`
    if(sec < 10) sec = `0${sec}`
    return hour + ":" + min + ":" + sec;
};

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertyInObject,
    getTime
}