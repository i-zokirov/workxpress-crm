import express from "express"
import { authenticate, registerUser } from "../controllers/userController.js"


const router = express.Router()

router.route("/sign-up")
    .post(registerUser)

router.route("/sign-in")
    .post(authenticate)


export default router