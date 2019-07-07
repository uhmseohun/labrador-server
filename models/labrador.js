import mongoose, { Schema } from 'mongoose'

const labradorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String
  }
})

export default mongoose.model('labrador', labradorSchema)
