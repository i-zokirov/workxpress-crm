import connectDB from "../config/mongoDBConfig.js";
import Student from "../data-models/studentModel.js";

import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const female =
    "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/female_oqgbtu.jpg";

const female2 =
    "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/female_2_jpftxt.jpg";

const male =
    "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/male_2_xkpdcr.jpg";

const male2 =
    "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/male_ainbco.jpg";

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

            const gender = genders[Math.floor(Math.random() * 2)];
            const imageByGender =
                gender === "Male"
                    ? male
                    : gender === "Other"
                    ? female2
                    : female;
            await Student.create({
                firstName: student.name.split(" ")[0],
                lastName: student.name.split(" ")[1],
                name: student.name,
                birthdate: `2000-${month < 10 ? `0${month}` : month}-${
                    day < 10 ? `0${day}` : day
                }`,
                gender,
                email: student.email,
                mobilePhoneNumber: student.phone,
                address: {
                    street: student.address.street,
                    suite: student.address.suite,
                    city: student.address.city,
                    postalCode: student.address.suite,
                },
                createdBy: "62b879e58769f97ed69e1e11",
                image: {
                    original: imageByGender,
                    thumbnail: imageByGender
                        .split("/upload/")
                        .join("/upload/c_thumb,w_200,g_face/"),
                    circle: imageByGender
                        .split("/upload/")
                        .join(
                            "/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/"
                        ),
                },
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
