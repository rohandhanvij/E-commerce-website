import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/add", createProduct);

// Get a single product by id
router.get("/:id", getProductById);

// Get all products
router.get("/", getProducts);

// Update a product
router.put("/update/:id", updateProduct);

// Delete a product
router.delete("/delete/:id", deleteProduct);

export default router;