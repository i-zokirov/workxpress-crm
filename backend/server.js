import express from 'express'
import path from "path"
import { notFound, errorHandler } from './errorHandlers/errorHandlers.js'
import connectDB from "./config/mongoDBConfig.js"

// ROUTES
import userRouter from "./routers/userRoutes.js"
import studentRouter from "./routers/studentRoutes.js"
import officeRouter from "./routers/officeRoutes.js"
import dotenv from 'dotenv'
dotenv.config()


const __dirname = path.resolve()

// CONNECT MONGODB
connectDB()


// APP
const app = express()
app.use(express.json())


// ROUTE HANDLERS
app.use("/api/users", userRouter)
app.use("/api/students", studentRouter)
app.use("/api/offices", officeRouter)


// ERROR HANDLERS
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} environment. \nServer PORT: ${PORT}`))