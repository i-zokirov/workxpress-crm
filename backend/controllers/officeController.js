import asyncHandler from "express-async-handler"
import Office from "../data-models/officesModel.js"

export const getAllOffices = asyncHandler(async(req, res) => {
    try {
        const offices = await Office.find().populate("manager", "name mobilePhoneNumber")
        res.json(offices)        
    } catch (error) {
        throw error
    }
})