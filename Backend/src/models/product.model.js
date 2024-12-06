import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
    min: [1, 'Quantity must be greater than 0'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
})

export const Product = mongoose.model('Product', productSchema)
