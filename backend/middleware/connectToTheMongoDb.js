import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            autoIndex: true
        });
        console.log("Successful connection to the database");
    } catch (error) {
        console.log("Error connecting to the database", error.message);
    }
}

export default connectToMongoDb;