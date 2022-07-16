import connectDB from "../config/mongoDBConfig.js";
import Office from "../data-models/officesModel.js";

import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const images = [
    {
        original:
            "https://res.cloudinary.com/workxpress/image/upload/v1657992414/workxpress/images/office2_luv9t9.jpg",
        banner: "https://res.cloudinary.com/workxpress/image/upload/c_fill,g_auto,h_300,w_970/v1657992414/workxpress/images/office2_luv9t9.jpg",
    },
    {
        original:
            "https://res.cloudinary.com/workxpress/image/upload/v1657992414/workxpress/images/office3_clbfvd.jpg",
        banner: "https://res.cloudinary.com/workxpress/image/upload/c_fill,g_auto,h_300,w_970/v1657992414/workxpress/images/office3_clbfvd.jpg",
    },
    {
        original:
            "https://res.cloudinary.com/workxpress/image/upload/v1657992414/workxpress/images/office4_qragab.jpg",
        banner: "https://res.cloudinary.com/workxpress/image/upload/c_fill,g_auto,h_300,w_970/v1657992414/workxpress/images/office4_qragab.jpg",
    },
    {
        original:
            "https://res.cloudinary.com/workxpress/image/upload/v1657992414/workxpress/images/office1_w1fr6m.jpg",
        banner: "https://res.cloudinary.com/workxpress/image/upload/c_fill,g_auto,h_300,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,,w_0.5,y_0.20/v1657992414/workxpress/images/office1_w1fr6m.jpg",
    },
];

async function seedOffices() {
    try {
        await connectDB();
        await Office.deleteMany();

        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        for (let dummy of data) {
            const image = images[Math.floor(Math.random() * 3)];
            await Office.create({
                officeName: `${dummy.address.street} branch`,
                phone: dummy.phone,
                address: {
                    street: dummy.address.street,
                    suite: dummy.address.suite,
                    city: dummy.address.city,
                    postalCode: dummy.address.zipcode,
                },
                manager: "62baeed165b8cade8a075a7d",
                employees: ["62baeed165b8cade8a075a7d"],
                image,
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

seedOffices();
