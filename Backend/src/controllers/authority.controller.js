import { Authority } from '../models/authority.model.js'
import { FIC } from '../models/fic.model.js'
import { User } from '../models/user.model.js'

const generateAccessToken = async (authorityId) => {
  try {
    const authorityInstance = await Authority.findById(authorityId)
    const authorityToken = await authorityInstance.generateAccessToken()
    return authorityToken
  } catch (error) {
    throw new Error('Something went wrong while generating the token')
  }
}

const createAuthority = async (req, res) => {
  try {
    const { fullname, username, password, email, role } = req.body
    if (!fullname || !username || !password || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const authorityInstance = await Authority.findOne({ username })
    if (authorityInstance) {
      return res.status(400).json({ message: 'Authority already exists' })
    }

    const newAuthority = await Authority.create({
      fullname,
      username,
      password,
      email,
      role,
    })
    if (!newAuthority) {
      return res
        .status(400)
        .json({ message: 'Error while creating the Authority' })
    }

    return res.status(200).json({ Authority: newAuthority })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const loginAuthority = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required!' })
    }
    if (await User.findOne({ username })) {
      const existedUser = await User.findOne({ username })
      //console.log(existedUser)
      if (!existedUser) {
        return res.status(400).json({ message: 'user not exists' })
      }
      const isPasswordValid = await existedUser.isPasswordCorrect(password)
      //console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: 'username or password incorrect' })
      }
      const accessToken = await generateAccessToken(existedUser._id)
      //console.log({ accessToken })
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json({ user: existedUser, accessToken })
    }
    if (await Authority.findOne({ username })) {
      const existedAuthority = await Authority.findOne({ username })
      if (!existedAuthority) {
        return res.status(400).json({ message: 'User not exists' })
      }
      const isPasswordValid = await existedAuthority.isPasswordCorrect(password)
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: 'Username or password incorrect' })
      }
      const authorityToken = await generateAccessToken(existedAuthority._id)
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      return res
        .status(200)
        .cookie('accessToken', authorityToken, options)
        .json({ authority: existedAuthority, authorityToken })
    }
    if (await FIC.findOne({ username })) {
      const existedFIC = await FIC.findOne({ username })
      if (!existedFIC) {
        return res.status(400).json({ message: 'FIC does not exist' })
      }
      const isPasswordValid = await existedFIC.isPasswordCorrect(password)
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: 'Username or password incorrect' })
      }
      const ficToken = await generateAccessToken(existedFIC._id)
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      return res
        .status(200)
        .cookie('accessToken', ficToken, options)
        .json({ fic: existedFIC, ficToken })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export { createAuthority, loginAuthority }
