import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    display_name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        default: ""
    },
    last_seen: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true } );

const User = mongoose.model("User", userSchema);

export default User;