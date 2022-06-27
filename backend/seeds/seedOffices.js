import connectDB from "../config/mongoDBConfig.js";
import Office from "../data-models/officesModel.js";

import dotenv from "dotenv";
import axios from "axios";
dotenv.config()


async function  seedOffices () {
    try {
        await connectDB()
        await Office.deleteMany()

        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users")
        for(let dummy of data){
            await Office.create({
                officeName: `${dummy.address.street} branch`,
                phone: dummy.phone,
                address: {
                    street: dummy.address.street,
                    suite: dummy.address.suite,
                    city: dummy.address.city,
                    postalCode: dummy.address.suite,
                },

            })
        }
        console.log('Data imported!')
        process.exit()
    } catch (error) {
        console.log('Data import FAILURE!')
        console.log(error)
        process.exit()
    }
}

seedOffices()