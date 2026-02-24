import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, price, description, image, isNew, isSale } = req.body;

    try {
        const product = await Product.create({
            name,
            price,
            description,
            image,
            isNew: !!isNew,
            isSale: !!isSale
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.put("/:id", async (req, res) => {
    const { name, price, description, image, isNew, isSale } = req.body;

    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description,
                image,
                isNew: !!isNew,
                isSale: !!isSale
            },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;