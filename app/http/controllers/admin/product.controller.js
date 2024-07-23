const path = require('path');
const Controller = require("../controller");
const { createProductSchema } = require("../../validators/admin/product.schema");
const ProductModel = require('../../../models/products.model');
const { deleteFileInPublic } = require('../../../utils/functions');

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            req.body.image = path.join(productBody.fileUploadPath, productBody.filename);
            
            const image = req.body.image.replace(/\\/g, "");
            
            const { title, text ,short_text, tags, category, price, discount, count, weight, length, height, width } = productBody;
            const supplier = req.user._id;

            let feture = {};
            let type = "physical";

            if(width || height || weight || length) {                
                if (!width) feture.width = 0;
                else feture.width = width;
                if (!height) feture.height = 0;
                else feture.height = height;
                if (!weight) feture.weight = 0;
                else feture.weight = weight;
                if (!length) feture.length = 0;
                else feture.length = length;
            } else {
                type = "virtual"
            }
            
            const product = await ProductModel.create({ title, text ,short_text, tags, category, price, discount, count, image, feture, supplier, type });

            return res.status(201).json({
                data: {
                    statusCode: 201,
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

    removeProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    products
                }
            })  
        } catch (error) {
            next(error)
        }
    }

    getProductById(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductController: new ProductController()
};