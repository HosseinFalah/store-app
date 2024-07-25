const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");

const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(virtual|phisical)/i),
    discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    colors: Joi.array().min(0).max(20).error(createHttpError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    weight: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    width: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()
});

module.exports = {
    createProductSchema
} 