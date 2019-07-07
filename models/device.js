import mongoose, { Schema } from 'mongoose'

const deviceSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owners: [String],
  desc: [String],
  methods: [{
    name: String,
    type: String,
    control: {
      method: String,
      url: String
    }
  }]
})

export default mongoose.model('device', deviceSchema)
