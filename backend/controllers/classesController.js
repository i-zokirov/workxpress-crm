import asyncHandler from "express-async-handler";
import Class from "../data-models/classModel.js";

export const getAllClasses = asyncHandler(async (req, res) => {
    const classes = await Class.find({}).populate("teacher", "name");
    res.json(classes);
});
