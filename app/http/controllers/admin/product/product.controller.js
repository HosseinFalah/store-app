const path = require('path');
const Controller = require("../../controller");
const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { createProductSchema } = require("../../../validators/admin/product.schema");
const ProductModel = require('../../../../models/products.model');
const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require('../../../../utils/functions');
const { ObjectIdValidator } = require('../../../validators/public.validator');

const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DESLIKES: "deslikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WIDTH: "width",
    LENGTH: "length",
    WEIGHT: "weight",
    HEIGHT: "height",
    COLORS: "colors"
}

Object.freeze(ProductBlackList);

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            
            const { title, text ,short_text, tags, category, price, discount, type, count } = productBody;
            const supplier = req.user._id;

            let features = setFeatures(req.body);
            
            const product = await ProductModel.create({ title, text ,short_text, tags, category, price, discount, count, images, features, supplier, type });

            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "ثبت محصول با موفقعیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            data.features = setFeatures(req.body);
            let blackListFields = Object.values(ProductBlackList);
            deleteInvalidPropertyInObject(data, blackListFields);

            const updateProductResult = await ProductModel.updateOne({ _id: product.id }, { $set: data });
            if (updateProductResult.modifiedCount == 0) throw { status: createHttpError.InternalServerError, message: "خطای داخلی" };
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روز رسانی با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }

    async removeProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const removeProductResult = await ProductModel.deleteOne({ _id: product._id });
            if (removeProductResult.deletedCount == 0) throw createHttpError.InternalServerError();
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف محصول با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const search = req?.query?.search || "";
            let products;

            if (search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                products = await ProductModel.find({});
            }
            
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    products
                }
            })  
        } catch (error) {
            next(error)
        }
    }

    async getProductById (req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    product
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async findProductById(productID) {
        const { id } = await ObjectIdValidator.validateAsync({ id: productID });
        const product = await ProductModel.findById(id);
        if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
        return product;
    };
}

module.exports = {
    ProductController: new ProductController()
};