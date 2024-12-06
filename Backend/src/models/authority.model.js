import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authoritySchema = new mongoose.Schema(
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

authoritySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

authoritySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

authoritySchema.methods.generateAccessToken = function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.AUTHORITY_TOKEN_SECRET,
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

export const Authority = mongoose.model('Authority', authoritySchema)
