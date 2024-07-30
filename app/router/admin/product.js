const { Router } = require("express");
const { ProductController } = require("../../http/controllers/admin/product/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();

router.post(`/add`, uploadFile.array('images', 10), stringToArray('tags', 'colors'), ProductController.addProduct);
router.get('/list', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.delete(`/remove/:id`, ProductController.removeProductById);
router.patch('/edit/:id', uploadFile.array('images', 10), stringToArray("tags", "colors"), ProductController.updateProduct);

module.exports = {
    ProductAdminApiRoutes: router
};