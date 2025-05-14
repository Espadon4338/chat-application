import express from "express";
import { configDotenv } from "dotenv";

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';

const app = express();

configDotenv();

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
})