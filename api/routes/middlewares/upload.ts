import multer from 'multer';

import { App } from 'app';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${App.PUBLIC_PATH}/img`);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg .jpeg formats are allowed'));
        }
    }
});

export { upload }
