import { FIC } from '../models/fic.model.js'

const generateAccessToken = async (ficId) => {
  try {
    const ficInstance = await FIC.findById(ficId)
    const ficToken = await ficInstance.generateAccessToken()
    return ficToken
  } catch (error) {
    throw new Error('Something went wrong while generating the token')
  }
}

const createFIC = async (req, res) => {
  try {
    const { fullname, username, password, email, role } = req.body
    if (!fullname || !username || !password || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const ficInstance = await FIC.findOne({ username })
    if (ficInstance) {
      return res.status(400).json({ message: 'FIC already exists' })
    }

    const newFIC = await FIC.create({
      fullname,
      username,
      password,
      email,
      role,
    })
    if (!newFIC) {
      return res.status(400).json({ message: 'Error while creating the FIC' })
    }

    return res.status(200).json({ FIC: newFIC })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// const loginFIC = async (req, res) => {
//   try {
//     const { username, password } = req.body
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: 'Username and password are required!' })
//     }
//     const existedFIC = await FIC.findOne({ username })
//     if (!existedFIC) {
//       return res.status(400).json({ message: 'FIC does not exist' })
//     }
//     const isPasswordValid = await existedFIC.isPasswordCorrect(password)
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Username or password incorrect' })
//     }
//     const ficToken = await generateAccessToken(existedFIC._id)
//     const options = {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None',
//     }
//     return res
//       .status(200)
//       .cookie('accessToken', ficToken, options)
//       .json({ fic: existedFIC, ficToken })
//   } catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

export { createFIC }
