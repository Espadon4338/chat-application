import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../util/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, display_name, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne( { username } );

        if (user) {
            return res.status(400).json({ error: "This user exists already" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const defaultAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
            username: username,
            password: hashedPassword,
            display_name: display_name,
            avatar_url: defaultAvatar
        });

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                display_name: newUser.display_name,
                password: newUser.password,
                avatar_url: newUser.avatar_url
            });
        }
    } catch (error) {        
        console.log("Error in sign up controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordMatch = await bcrypt.compare(password, user?.password || "");
        
        if (!user || !isPasswordMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            display_name: user.display_name,
            password: user.password,
            avatar_url: user.avatar_url
        });
    } catch (error) {        
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}