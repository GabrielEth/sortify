import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        metric2:{
            type: String,
            required: true
        },
        metric3:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);