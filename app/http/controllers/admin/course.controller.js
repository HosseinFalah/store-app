const path = require('path');
const { StatusCodes } = require('http-status-codes');
const Controller = require("../controller");
const CourseModel = require("../../../models/courses.model");
const { createCourseSchema } = require('../../validators/admin/course.schema');
const createHttpError = require('http-errors');

class CourseController extends Controller {
    async getAllCourse(req, res, next) {
        try {
            const { search } = req.query;
            let courses;

            if (search) await CourseModel.find({ $text: { $search: search }}).sort({ _id: -1 });
            else courses = await CourseModel.find({}).sort({ _id: -1 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                courses
            })
        } catch (error) {
            next(error)
        }
    }

    async addCourse(req, res, next) {
        try {
            await createCourseSchema.validateAsync(req.body);
            const { fileUploadPath, filename } = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const { title, short_text, text, tags, category, price, discount, type } = req.body;
            const teacher = req.user._id

            if (Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره های رایگان نمیتوان قیمت ثبت کرد");
            
            const course = await CourseModel.create({
                title, 
                short_text,
                text, 
                tags, 
                category,
                price, 
                discount,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher
            });

            if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
            
            return res.status(StatusCodes.CREATED).json({ 
                statusCode: StatusCodes.CREATED,
                message: "دوره با موفقعیت ایجاد شد"
            });
        } catch (error) {
            next(error);
        }
    }

    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            
            const course = await CourseModel.findById(id);
            if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                course
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    CourseController: new CourseController()
}