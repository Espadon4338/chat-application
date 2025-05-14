import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";
import User from "../models/user.model.js";

configDotenv();

const protectRoute = async (req, res, next) => {
    try {
        console.log(req.cookies.jwt);
        const token = req.cookies.jwt;
        
        if(!token) {
            return res.status(401).json({ error: "Unauthorised - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ error: "Unauthorised - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log("Error in protectRoute.js", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectRoute;