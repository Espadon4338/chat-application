import express from "express";
import { configDotenv } from "dotenv";

const app = express();

configDotenv();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
})