import asyncHandler from "express-async-handler";
import Office from "../data-models/officesModel.js";
import uploadImage from "../middleware/uploadImage.js";
import { cloudinary } from "../services/cloudinary.js";

// @desc:   Get all offices
// @route:  GET /api/offices
// @access: PRIVATE
export const getAllOffices = asyncHandler(async (req, res) => {
    try {
        const offices = await Office.find()
            .populate("manager", "name mobilePhoneNumber image")
            .populate("students", "name");
        res.json(offices);
    } catch (error) {
        throw error;
    }
});

// @desc:   Create office
// @route:  POST /api/offices
// @access: PRIVATE && Admin
export const createOffice = asyncHandler(async (req, res) => {
    try {
        const { officeName, address, phone } = req.body;
        const office = await Office.create({
            officeName,
            address,
            phone,
        });
        res.json(office);
    } catch (error) {
        throw error;
    }
});

// @desc:   Get single office
// @route:  GET /api/offices/:officeId
// @access: PRIVATE
export const getSingleOffice = asyncHandler(async (req, res) => {
    const office = await Office.findById(req.params.officeId)
        .populate("employees", "name mobilePhoneNumber role image")
        .populate("students", "name")
        .populate("manager", "name mobilePhoneNumber role image");
    if (office) {
        res.json(office);
    } else {
        res.status(404);
        throw new Error("Office not found");
    }
});

// @desc:   Update single office
// @route:  PUT /api/offices/:officeId
// @access: PRIVATE && Admin
export const updateSingleOffice = asyncHandler(async (req, res) => {
    const office = await Office.findById(req.params.officeId).populate(
        "manager"
    );
    if (office) {
        office.officeName = req.body.officeName
            ? req.body.officeName
            : office.officeName;
        office.phone = req.body.phone ? req.body.phone : office.phone;
        office.address = req.body.address ? req.body.address : office.address;
        office.manager = req.body.manager ? req.body.manager : office.manager;

        await office.save();
        res.json({ message: "Office record has been successfully updated!" });
    } else {
        res.status(404);
        throw new Error("Office not found");
    }
});

// @desc:   Update single office image
// @route:  PUT /api/offices/:officeId/upload
// @access: PRIVATE && Admin
export const uploadOfficeImage = asyncHandler(async (req, res) => {
    const office = await Office.findById(req.params.officeId);
    if (office) {
        console.log("Upload start");
        await uploadImage(req, res);
        console.log("Upload done");

        const { filename, path } = req.file;
        if (office.image && office.image.filename) {
            cloudinary.uploader.destroy(office.image.filename);
        }

        const newImage = {
            filename,
            original: path,
            banner: path
                .split("/upload/")
                .join("/upload/c_fill,g_auto,h_300,w_970/"),
        };

        office.image = newImage;
        await office.save();
        res.json(newImage);
    } else {
        res.status(404);
        throw new Error("Office not found");
    }
});
