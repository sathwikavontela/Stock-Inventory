import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateAccessToken = async (userId) => {
  try {
    //console.log(userId)
    const userInstance = await User.findById(userId)
    //console.log(userInstance)
    const accessToken = await userInstance.generateAccessToken()
    //console.log(accessToken)
    //userInstance.save({ validateBeforeSave: false }) //used when sesion token is used in the code
    return accessToken
  } catch (error) {
    throw new ApiError(400, 'something went wrong while generating the token')
  }
}

const createDept = async (req, res) => {
  try {
    const { fullname, username, password, email, role, department } = req.body
    console.log(fullname, username, password, email, role, department)
    if (!fullname || !username || !password || !email || !role || !department) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const userInstance = await User.findOne({ username })
    if (userInstance) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = await User.create({
      fullname,
      username,
      password,
      email,
      role,
      department,
    })
    if (!newUser) {
      return res.status(400).json({ message: 'Error while creating the User' })
    }

    return res.status(200).json({ User: newUser })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    //console.log(username, password)
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'username and password are required!' })
    }

    const existedUser = await User.findOne({ username })
    //console.log(existedUser)
    if (!existedUser) {
      return res.status(400).json({ message: 'user not exists' })
    }
    const isPasswordValid = await existedUser.isPasswordCorrect(password)
    //console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'username or password incorrect' })
    }
    const accessToken = await generateAccessToken(existedUser._id)
    //console.log({ accessToken })
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }
    res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .json({ user: existedUser, accessToken })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export { createDept, loginUser }
