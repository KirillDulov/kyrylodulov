import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({ email: "admin@mail.com" });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        await User.create({
            username: "admin",
            email: "admin@mail.com",
            password: "admin123",
            role: "admin"
        });

        console.log("Admin created successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();