const path = require('path');
const fs = require('fs');
const multer = require('multer');
const createHttpError = require('http-errors');

function createRoutes(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
    fs.mkdirSync(directory, { recursive: true });
    return directory;   
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {            
            const filePath = createRoutes(req);
            return cb(null, filePath);
        }
        cb(null, null);
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {            
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null, fileName);
        }
        cb(null, null);
    }
});

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }

    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const maxSize = 3 * 1000 * 1000;
const uploadFile = multer({ storage, fileFilter, limits: { fileSize: maxSize } });

module.exports = {
    uploadFile
}