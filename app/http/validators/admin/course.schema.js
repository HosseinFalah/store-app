const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()
});

const createEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان اپیزود صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterID: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("شناسه فصل صحیح نمیباشد")),
    courseID: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("شناسه دوره صحیح نمیباشد")),
    filename: Joi.string().regex(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv)$/).error(createHttpError.BadRequest("ویدیو ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}