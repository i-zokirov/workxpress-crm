import connectDB from "../config/mongoDBConfig.js";
import Student from "../data-models/studentModel.js";

import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const genders = ["Male", "Female", "Other"];
async function seedStudents() {
    try {
        await connectDB();
        await Student.deleteMany();

        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        for (let student of data) {
            const day = Math.floor(Math.random() * 30);
            const month = Math.floor(Math.random() * 12);
            await Student.create({
                firstName: student.name.split(" ")[0],
                lastName: student.name.split(" ")[1],
                name: student.name,
                birthdate: `2000-${month < 10 ? `0${month}` : month}-${
                    day < 10 ? `0${day}` : day
                }`,
                gender: genders[Math.floor(Math.random() * 2)],
                email: student.email,
                mobilePhoneNumber: student.phone,
                address: {
                    street: student.address.street,
                    suite: student.address.suite,
                    city: student.address.city,
                    postalCode: student.address.suite,
                },
                createdBy: "62b879e58769f97ed69e1e11",
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

seedStudents();
