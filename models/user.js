import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    default: 'user'
  }
})

export default mongoose.model('user', userSchema)
