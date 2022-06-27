import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
})

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true  
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    email: {
        type: String,
        unique: true
    },
    mobilePhoneNumber: {
        type: String,
        required: true
    },
    homeTelephoneNumber: {
        type: String,
    },
    image: {
        type: String,
    },
    address: addressSchema,
    status: {
        type: String,
        required: true,
        enum: ["Student", "New Applicant", "Alumni", "Graduated", "Drop-out"],
        default: "New Applicant"
    },
    currentTeacher :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currentTeacherSince :{
        type: Date,
    },
    previousTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})


const Student = mongoose.model('Student', studentSchema)

export default Student