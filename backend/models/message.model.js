import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciever_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["sent", "modified"]
    }
}, { timestamps: true } );

const Message = mongoose.model("Message", messageSchema);

export default Message;