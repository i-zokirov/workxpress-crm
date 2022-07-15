import multer from "multer";
import util from "util";
import path from "path";
import { storage } from "../services/cloudinary.js";

const maxUploadSize = process.env.maxUploadSize || 2 * 1024 * 1024;

async function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(
            "File type is not accepted. Accepted file types are jpg|jpeg|png"
        );
    }
}

const processFile = multer({
    storage,
    limits: { fileSize: maxUploadSize },
}).single("image");

const uploadImage = util.promisify(processFile);

export default uploadImage;
