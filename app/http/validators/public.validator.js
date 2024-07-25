const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constans");

const ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد"))
});

module.exports = {
    ObjectIdValidator
}