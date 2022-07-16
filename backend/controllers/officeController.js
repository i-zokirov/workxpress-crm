import asyncHandler from "express-async-handler";
import Office from "../data-models/officesModel.js";

// @desc:   Get all offices
// @route:  GET /api/offices
// @access: PRIVATE
export const getAllOffices = asyncHandler(async (req, res) => {
    try {
        const offices = await Office.find().populate(
            "manager",
            "name mobilePhoneNumber image"
        );
        res.json(offices);
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
        .populate("manager", "name mobilePhoneNumber role image");
    if (office) {
        res.json(office);
    } else {
        res.status(404);
        throw new Error("Office not found");
    }
});
