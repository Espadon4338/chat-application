import express from "express";
import path from 'path';
import { configDotenv } from "dotenv";

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDb from "./db/connectToTheMongoDb.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

configDotenv();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});