import mongoose, { Schema } from 'mongoose'

const labradorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

export default mongoose.model('labrador', labradorSchema)
