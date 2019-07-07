import mongoose, { Schema } from 'mongoose'

const placeSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: [String],
  geocode: {
    lat: Number,
    lng: Number
  }
})

export default mongoose.model('place', placeSchema)
