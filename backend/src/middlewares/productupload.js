import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import ErrorResponse from '../_helpers/error/ErrorResponse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        let loadPath = path.join(__dirname,'../../public/imgs/products');
        fs.mkdirSync(loadPath, { recursive: true });
        callback(null, loadPath);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.toLowerCase().match(/(.*?)\.(jpe?g|png)$/)){
            return cb(new ErrorResponse('File extension is disallowed!', 400));
        }
        cb(undefined, true);
    }
})
export { upload };
