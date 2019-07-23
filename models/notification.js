import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  to: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

export default mongoose.model('notification', notificationSchema)
