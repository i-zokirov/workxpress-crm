import asyncHandler from "express-async-handler"
import Student from "../data-models/studentModel.js"

export const getAllStudents = asyncHandler(async(req, res) => {
    try {
        const students = await Student.find()
        res.json(students)        
    } catch (error) {
        throw error
    }
})