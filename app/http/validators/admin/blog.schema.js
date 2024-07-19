const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow()
});

const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد'))
});

module.exports = {
    createBlogSchema,
    updateCategorySchema
};