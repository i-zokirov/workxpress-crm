import express from "express";
import expressAsyncHandler from "express-async-handler";
import Office from "../data-models/officesModel.js";
import Class from "../data-models/classModel.js";
import Student from "../data-models/studentModel.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

const getStats = expressAsyncHandler(async (req, res) => {
    const offices = await Office.find();
    const newRegisteredStudents = await Student.find({
        status: "New Applicant",
    });
    const allStudents = await Student.find();

    res.json({
        officesCount: offices.length,
        newRegisteredStudentsCount: newRegisteredStudents.length,
        allStudents: allStudents.length,
    });
});

router.route("/").get(protect, getStats);

export default router;
