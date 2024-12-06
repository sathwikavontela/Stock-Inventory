import mongoose from 'mongoose'
//object data modeling schema based solution purpose
// using mongoose mongodb using is easy
import { DB_NAME } from '../../utils.js'

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log('mongo db connected successfully')
  } catch (error) {
    console.log('error is', error)
  }
}

export default connectDB
