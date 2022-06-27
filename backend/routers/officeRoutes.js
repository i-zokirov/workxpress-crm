import express from "express"
import { getAllOffices } from "../controllers/officeController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .get( protect, getAllOffices)


export default router