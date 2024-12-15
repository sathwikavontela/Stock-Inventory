import { Product } from "../models/product.model.js";
const createProduct = async (req, res) => {
  try {
    const { name, quantity, image, description } = req.body;
    if (!name || !quantity || !description) {
      return res.status(400).json({
        message: "name, quantity and description are required fields",
      });
    }
    const existedProduct = await Product.findOne({ name });
    if (existedProduct) {
      return res.status(400).json({ message: "product already exists" });
    }
    const newProduct = await Product.create({
      name,
      quantity,
      image,
      description,
    });
    if (!newProduct) {
      return res.status(400).json({ message: "error while adding product" });
    }
    return res.status(200).json({ Product: newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(400).json({ message: "error in displaying product" });
    }
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validate request data
    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Product ID and quantity are required." });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative." });
    }

    // Find the product and update its quantity
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { quantity },
      { new: true, runValidators: true } // Return the updated product and run validations
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Respond with the updated product
    res.status(200).json({
      message: "Product quantity updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({
      error:
        "An error occurred while updating the product quantity. Please try again later.",
    });
  }
};

export { createProduct, getAllProducts, updateProductQuantity };
