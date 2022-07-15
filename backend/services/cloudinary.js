import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// TODO: COMMENT BEFORE DEPLOYING
import dotenv from "dotenv";
dotenv.config();
// =============================

cloudinary.config({
    cloud_name: process.env.CL_CLOUD_NAME,
    api_key: process.env.CL_API_KEY,
    api_secret: process.env.CL_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "workxpress/images",
        allowedFormats: ["jpg", "png", "jpeg"],
    },
});

export { cloudinary, storage };
