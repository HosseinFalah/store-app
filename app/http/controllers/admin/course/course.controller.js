const path = require('path');
const createHttpError = require('http-errors');
const { default: mongoose } = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const Controller = require("../../controller");
const CourseModel = require("../../../../models/courses.model");
const { createCourseSchema } = require('../../../validators/admin/course.schema');
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic, getTimeOfCourse } = require('../../../../utils/functions');

class CourseController extends Controller {
    async getAllCourse(req, res, next) {
        try {
            const { search } = req.query;
            let courses;

            if (search) courses = await CourseModel.find({ $text: { $search: search }})
                .populate([
                    {path: 'category', select: { title: 1 }},
                    {path: 'teacher', select: { first_name: 1, last_name: 1, mobile: 1, email: 1 }}
                ])
                .sort({ _id: -1 });
            else courses = await CourseModel.find({})
                .populate([
                    {path: 'category', select: { title: 1 }},
                    {path: 'teacher', select: { first_name: 1, last_name: 1, mobile: 1, email: 1 }}
                ])
                .sort({ _id: -1 });

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
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
                status: "notStarted",
                teacher
            });

            if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
            
            return res.status(StatusCodes.CREATED).json({ 
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "دوره با موفقعیت ایجاد شد"
                }
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
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.findCourseById(id);
            const data = copyObject(req.body);
            const { filename, fileUploadPath} = req.body;
            let blackListFields = ["time", "chapters", "episodes", "students", "bookmarks", "likes", "dislikes", "comments", "fileUploadPath", "filename"];
            deleteInvalidPropertyInObject(data, blackListFields);
            if (req.file) {
                data.image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
                deleteFileInPublic(course.image);
            }
            const updateCourseResult = await CourseModel.updateOne({ _id: id }, {
                $set: data
            });

            if (!updateCourseResult.modifiedCount) throw new createHttpError.InternalServerError("به روزرسانی دوره انجام نشد");

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روزرسانی دوره با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async findCourseById(id) {
        if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");
        const course = await CourseModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course;
    }
};

module.exports = {
    CourseController: new CourseController()
}