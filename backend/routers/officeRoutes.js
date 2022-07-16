import express from "express";
import {
    getAllOffices,
    getSingleOffice,
} from "../controllers/officeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllOffices);

router.route("/:officeId").get(protect, getSingleOffice);

export default router;
