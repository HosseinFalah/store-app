const createHttpError = require("http-errors");
const CategoryModel = require("../../../../models/categories.model");
const Controller = require("../../controller");
const { addCategorySchema, updateCategorySchema } = require("../../../validators/admin/category.schema");
const { Types } = require("mongoose");
const { StatusCodes } = require("http-status-codes");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if (!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "دسته بندی با موفقعیت افزوده شد"
                }
            });
        } catch (error) {
            next(error);
        };
    };

    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    { _id: category._id },
                    { parent: category._id }
                ]
            });

            if (deleteResult.deletedCount === 0) throw createHttpError.InternalServerError("دسته بندی با موفقعیت حذف نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف دسته بندی با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            next(error);
        }
    };

    async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const category = await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            const resultOfUpdate = await CategoryModel.updateOne({ _id: id }, { $set: { title } });
            if (resultOfUpdate.modifiedCount === 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "بروزرسانی با موفقعیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllCategory(req, res, next) {
        try {
            const categories = await CategoryModel.find({ parent: undefined });

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            });
        } catch (error) {
            next(error);
        }
    };

    async getAllCategoryWithoutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                { $match: {} }
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const { id: _id } = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: { _id: new Types.ObjectId(_id) }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },
                
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    parents
                }
            })        
        } catch (error) {
            next(error);
        }
    };

    async getChildOfParents(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find({ parent }, { __v: 0, parent: 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    children
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
        return category;
    }
};

module.exports = {
    CategoryController: new CategoryController()
}