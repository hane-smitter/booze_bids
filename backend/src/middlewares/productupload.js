import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
            return cb(new Error('File extension is disallowed!'));
        }
        cb(undefined, true);
    }
})
export { upload };
