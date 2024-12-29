import { Product } from '../models/product.model.js'
const createProduct = async (req, res) => {
  try {
    const { name, quantity, image, description } = req.body
    if (!name || !quantity || !description) {
      return res.status(400).json({
        message: 'name, quantity and description are required fields',
      })
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

const updateProduct = async (req, res) => {
  const { productId, name, description, quantity } = req.body
  console.log(productId, name, description, quantity)

  try {
    if (!productId || !name || !description || !quantity) {
      return res.status(400).json({
        error: 'Product ID, name, description, and quantity are required.',
      })
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Stock cannot be negative.' })
    }

    // Use productId to find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, quantity },
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    return res.status(200).json({
      message: 'Product updated successfully.',
      product: updatedProduct,
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return res.status(500).json({
      error:
        'An error occurred while updating the product. Please try again later.',
    })
  }
}

const getProductById = async (req, res) => {
  const { productId } = req.params
  //console.log(productId)

  try {
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' })
    }
    const product = await Product.findById(productId)
    // console.log(product)
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }
    //console.log(product)
    return res.status(200).json({ product: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return res.status(500).json({
      error:
        'An error occurred while fetching the product. Please try again later.',
    })
  }
}

const getProductByName = async (req, res) => {
  const { productName } = req.params
  console.log(productName)

  try {
    if (!productName) {
      return res.status(400).json({ error: 'Product name is required.' })
    }
    const product = await Product.findOne({ name: productName })
    // console.log(product)
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }
    // console.log(product)
    return res.status(200).json({ product: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return res.status(500).json({
      error:
        'An error occurred while fetching the product. Please try again later.',
    })
  }
}

export {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
  getProductByName,
}
