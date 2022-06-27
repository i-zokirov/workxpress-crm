import express from "express"
import { 
    createNewStudent,
    deleteSingleStudent,
    getAllStudents, 
    getSingleStudent, 
    updateStudent 
} from "../controllers/studentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .get(protect, getAllStudents)

router.route("/new")
    .post(protect, createNewStudent)

    
router.route("/:studentId")
    .get(protect, getSingleStudent)
    .delete(protect, deleteSingleStudent)
    .put(protect, updateStudent)

export default router