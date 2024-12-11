import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupChat: {
        type: Boolean,
        default: false
    },
    creater: {
        type: Types.ObjectId,
        ref: "User"
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    members: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })


export const Chat = mongoose.models.Chat || model("Chat", schema)