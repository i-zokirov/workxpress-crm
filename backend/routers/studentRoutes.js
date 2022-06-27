import express from "express"
import { getAllStudents } from "../controllers/studentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .get(protect, getAllStudents)


export default router