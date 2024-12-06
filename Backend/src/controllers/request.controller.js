import RequestForm from '../models/request.model.js'
import { User } from '../models/user.model.js'

const createRequestForm = async (req, res) => {
  const { items } = req.body
  // console.log(items)
  const userId = req.user._id
  //console.log(userId)

  try {
    if (!items || !userId) {
      return res.status(400).json({ message: 'All fileds are required' })
    }
    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json({ message: 'User not authorised' })
    }
    const newrequest = await RequestForm.create({ items, userId })
    //console.log(newrequest)
    if (!newrequest) {
      return res.status(400).json({ message: 'Error while requesting items' })
    }
    const populatedRequest = await RequestForm.findById(
      newrequest._id
    ).populate('userId')

    return res.status(200).json({ populatedRequest })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getRequestForms = async (req, res) => {
  try {
    const userId = req.user._id
    // console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: 'user not authorised' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'user not found' })
    }
    const requests = await RequestForm.find({})
    if (!requests) {
      return res.status(400).json({ message: 'Error while fetching requests' })
    }
    //console.log(requests)
    return res.status(200).json({ requests })
  } catch (error) {
    return res.status(200).json({ error: error.message })
  }
}
const getRequestFormById = async (req, res) => {
  try {
    const { orderId } = req.params
    const userId = req.user._id
    if (!userId) {
      return res.status(400).json({ message: 'User not authorized' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const request = await RequestForm.findById(orderId).populate('userId')
    if (!request) {
      return res.status(400).json({ message: 'Request not found' })
    }
    return res.status(200).json({ request })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export { createRequestForm, getRequestForms, getRequestFormById }
