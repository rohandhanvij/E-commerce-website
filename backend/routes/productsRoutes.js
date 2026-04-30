import express from "express";
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/add", createProduct);

// Get all products
router.get("/", getProducts);

// Update a product
router.put("/update/:id", updateProduct);

// Delete a product
router.delete("/delete/:id", deleteProduct);

export default router;