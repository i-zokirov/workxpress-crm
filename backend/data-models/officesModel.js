import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    suite: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
});

const officeSchema = mongoose.Schema(
    {
        officeName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: addressSchema,
        employees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Office = mongoose.model("Office", officeSchema);

export default Office;
