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

const updateSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        email: {
            type: String,
            unique: true,
        },
        mobilePhoneNumber: {
            type: String,
            required: true,
        },
        homeTelephoneNumber: {
            type: String,
        },
        image: {
            filename: String,
            original: String,
            thumbnail: String,
            circle: String,
        },
        address: addressSchema,
        status: {
            type: String,
            required: true,
            enum: [
                "Student",
                "New Applicant",
                "Alumni",
                "Graduated",
                "Drop-out",
            ],
            default: "New Applicant",
        },
        enrolledClasses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Office",
        },
        updateHistory: [updateSchema],
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
