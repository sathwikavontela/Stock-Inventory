import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() // Correct the path
  this.password = await bcrypt.hash(this.password, 10) //hash it with salt of round 10
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

//jwt.sign() is a method provided by the jsonwebtoken library that is used to generate a JWT.
// It takes the payload (the data you want to send) and signs it using a secret or a private key,
//creating a token that can be sent to clients.
userSchema.methods.generateAccessToken = function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 432000,
      }
    )
    return token
  } catch (error) {
    console.error('Error while generating access token:', error)
    throw new Error('Failed to generate access token')
  }
}

export const User = mongoose.model('User', userSchema)
