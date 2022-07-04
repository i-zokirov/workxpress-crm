import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const userSchema = mongoose.Schema(
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
        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
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
        bio: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ["Administrator", "Teacher", "Receptionist", "Teacher"],
            default: "Teacher",
        },
        address: addressSchema,
        telegram: {
            type: String,
        },
        instagram: {
            type: String,
        },
        facebook: {
            type: String,
        },
        registeredOffice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Office",
        },
        mobilePhoneNumber: {
            type: String,
            required: true,
        },
        homeTelephoneNumber: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        passwordExpired: {
            type: Boolean,
            required: true,
            default: false,
        },
        passwordLastChanged: {
            type: Date,
            default: new Date(),
        },
        rootAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// custom middleware to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    const valid = await bcrypt.compare(enteredPassword, this.password);
    if (valid) {
        // this.passwordExpired = true
        // TODO: Implement a logic for password expiry
        return true;
    } else {
        return false;
    }
};

// before user record is registered, password is hashed
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
