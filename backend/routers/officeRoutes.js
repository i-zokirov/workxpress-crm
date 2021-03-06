import express from "express";
import {
    createOffice,
    getAllOffices,
    getSingleOffice,
    updateSingleOffice,
    uploadOfficeImage,
} from "../controllers/officeController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(protect, getAllOffices)
    .post(protect, isAdmin, createOffice);

router
    .route("/:officeId")
    .get(protect, getSingleOffice)
    .put(protect, isAdmin, updateSingleOffice);

router.route("/:officeId/upload").put(protect, isAdmin, uploadOfficeImage);
export default router;
