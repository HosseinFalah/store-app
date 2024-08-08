const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constans");

const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمیباشد")),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern)).error(new Error("دسترسی های ارسال شده صحیح نمیباشد"))
});

module.exports = {
    addRoleSchema
}