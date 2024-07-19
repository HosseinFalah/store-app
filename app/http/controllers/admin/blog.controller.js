const path = require('path');
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const BlogModel = require('../../../models/blogs.model');
const { deleteFileInPublic } = require('../../../utils/functions');
const createHttpError = require('http-errors');

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const { title, text, short_text, tags, category } = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            const blog = await BlogModel.create({ title, image, text, short_text, tags, category, author });
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "ایجاد بلاگ با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }

    async getBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog(id);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.otp": 0,
                        "author.Rolse": 0,
                        "author.discount": 0,
                        "author.bills": 0
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blogs
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getCommentsOfBlog(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async deleteBlogById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) throw createHttpError.InternalServerError('حذف انجام نشد');
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "حذف مقاله با موفقعیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateBlogById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);

            if (req?.body?.fileUploadPath && req?.body?.filename) {                
                req.body.image = path.join(req?.body?.fileUploadPath, req?.body?.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            
            const data = req.body;
            let nullishData = ["", " ", 0, null, undefined];
            let blackListFields = ["likes", "deslikes", "bookmarks", "comments"];
            Object.keys(data).forEach(key => {
                console.log(key);
                console.log(data[key]);
                if (blackListFields.includes(key)) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim()); 
                if (nullishData.includes(data[key])) delete data[key];
            })
            
            const updateResult = await BlogModel.updateOne({ _id: id }, { $set: data });
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("به روزرسانی انجام نشد");
            
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "به روزرسانی بلاگ با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image);
            next(error);
        }
    }

    async findBlog(id) {
        const blog = await BlogModel.findById(id).populate([{ path: "category", select: ['title'] }, { path: "author", select: ['mobile', 'first_name', 'last_name', 'username'] }]);
        if (!blog) throw createHttpError.NotFound("مقاله ای یافت نشد");
        delete blog.category.children;
        return blog;
    }
}

module.exports = {
    AdminBlogController: new BlogController()
}