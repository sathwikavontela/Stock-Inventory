import { Product } from '../models/product.model.js'
const createProduct = async (req, res) => {
  try {
    const { name, quantity, image, description } = req.body
    if (!name || !quantity || !description) {
      return res
        .status(400)
        .json({ message: 'name, quantity and description are required fields' })
    }
    const existedProduct = await Product.findOne({ name })
    if (existedProduct) {
      return res.status(400).json({ message: 'product already exists' })
    }
    const newProduct = await Product.create({
      name,
      quantity,
      image,
      description,
    })
    if (!newProduct) {
      return res.status(400).json({ message: 'error while adding product' })
    }
    return res.status(200).json({ Product: newProduct })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    if (!products) {
      return res.status(400).json({ message: 'error in displaying product' })
    }
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export { createProduct, getAllProducts }
