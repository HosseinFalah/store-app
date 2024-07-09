const createHttpError = require("http-errors");
const { authShema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");

module.exports = new class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).json("index page store");
        } catch (error) {
            next(error);
        }
    }
}