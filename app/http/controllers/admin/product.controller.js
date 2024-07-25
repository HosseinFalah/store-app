const path = require('path');
const Controller = require("../controller");
const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { createProductSchema } = require("../../validators/admin/product.schema");
const ProductModel = require('../../../models/products.model');
const { deleteFileInPublic, ListOfImagesFromRequest } = require('../../../utils/functions');
const { ObjectIdValidator } = require('../../validators/public.validator');

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            
            const { title, text ,short_text, tags, category, price, discount, type, count, weight, length, colors, height, width } = productBody;
            const supplier = req.user._id;

            let feture = {};
            feture.colors = colors;

            if(!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {                
                if (!width) feture.width = 0;
                else feture.width = +width;
                if (!height) feture.height = 0;
                else feture.height = +height;
                if (!weight) feture.weight = 0;
                else feture.weight = +weight;
                if (!length) feture.length = 0;
                else feture.length = +length;
            };
            
            const product = await ProductModel.create({ title, text ,short_text, tags, category, price, discount, count, images, feture, supplier, type });

            return res.status(StatusCodes.CREATED).json({
                data: {
                    statusCode: StatusCodes.CREATED,
                    message: "ثبت محصول با موفقعیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error)
        }
    }

    updateProduct(req, res, next) {
        try {
            
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
                message: "حذف محصول با موفقعیت انجام شد"
            });
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.find({});
            return res.status(StatusCodes.OK).json({
                data: {
                    statusCode: StatusCodes.OK,
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
                product
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