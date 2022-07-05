import connectDB from "../config/mongoDBConfig.js";
import Class from "../data-models/classModel.js";

import dotenv from "dotenv";
dotenv.config();

const classes = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper-Intermediate",
    "Advanced",
];
async function seedClasses() {
    try {
        await connectDB();
        await Class.deleteMany();

        for (let level of classes) {
            await Class.create({
                className: level,
                teacher: "62baeed165b8cade8a075a7d",
            });
        }

        console.log("Data imported!");
        process.exit();
    } catch (error) {
        console.log("Data import FAILURE!");
        console.log(error);
        process.exit();
    }
}

seedClasses();
