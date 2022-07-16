import express from "express";
import {
    authenticate,
    deleteUser,
    getAllUsers,
    getSingleUser,
    registerUser,
    updateCriticalProp,
    updateSingleUser,
    uploadUserImage,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getAllUsers);

router.route("/registerUser").post(protect, isAdmin, registerUser);

router.route("/sign-in").post(authenticate);

router
    .route("/:userId")
    .get(protect, getSingleUser)
    .put(protect, updateSingleUser);

router.route("/:userId/upload").post(protect, uploadUserImage);
router
    .route("/:userId/admin")
    .delete(protect, isAdmin, deleteUser)
    .put(protect, isAdmin, updateCriticalProp);

export default router;
