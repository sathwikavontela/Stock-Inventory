import { Product } from './product.model.js'
import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
})

const RequestFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [ItemSchema],
    remarks:{
      type:String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

const RequestForm = mongoose.model('RequestForm', RequestFormSchema)

export default RequestForm
