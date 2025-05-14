import express from "express";
import { configDotenv } from "dotenv";

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDb from "./db/connectToTheMongoDb.js";
import cookieParser from "cookie-parser";

const app = express();

configDotenv();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is listening on the port ${PORT}`);
})