const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constans");

const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent: Joi.string().allow('').pattern(MongoIDPattern).allow("").error(new Error("شناسه ارسال شده صحیح نمی باشد"))
});

const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),

})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}