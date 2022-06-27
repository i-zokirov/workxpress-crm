import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    systemPassword:{
        type: String,
    },
    passwordExpired: {
        type: Boolean,
        required: true,
        default: false
    },
    passwordLastChanged: {
        type: Date,
        default: new Date()
    },
    role: {
        type: String,
        required: true,
        enum: ["Administrator", "Teacher", "Receptionist", "Customer Service Advisor"],
        default: "Customer Service Advisor"
    },
}, {
    timestamps: true
})

// custom middleware to compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.matchSystemPassword = async function(systemPassword){
    const valid = await bcrypt.compare(systemPassword, this.password)
    if(valid){
        this.passwordExpired = true
        return true
    } else {
        return false
    }
}

// before user record is registered, password is hashed
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User