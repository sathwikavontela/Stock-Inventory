import ReturnForm from '../models/return.model.js'
import { User } from '../models/user.model.js'

const createReturnForm = async (req, res) => {
  const { items } = req.body
  console.log(items)
  const userId = req.user._id
  try {
    if (!items || !userId) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'user Not authorised' })
    }
    const newReturn = await ReturnForm.create({ items, userId })
    if (!newReturn) {
      return res
        .status(400)
        .json({ message: 'Error while creating return request' })
    }
    const populatedReturn = await ReturnForm.findById(newReturn._id).populate(
      'userId'
    )
    return res.status(200).json({ populatedReturn })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getreturns = async (req, res) => {
  try {
    const returns = await ReturnForm.find({})
    if (!returns) {
      return res.status(400).json({ message: 'Error while fetching returns' })
    }
    return res.status(200).json({ returns })
  } catch (error) {
    return res.status(200).json({ error: error.message })
  }
}

export { createReturnForm, getreturns }
