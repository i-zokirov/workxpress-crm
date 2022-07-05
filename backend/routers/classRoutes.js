import express from "express";
import { getAllClasses } from "../controllers/classesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllClasses);

export default router;
