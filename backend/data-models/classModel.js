import mongoose from "mongoose";

const classSchema = mongoose.Schema(
    {
        className: {
            type: String,
            required: true,
        },
        schedule: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ["Not started", "Ongoing", "Finished", "Cancelled"],
            default: "Not started",
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        started: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
