import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const contact = await Contact.create({ name, email, message });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;