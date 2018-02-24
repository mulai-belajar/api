const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  total_donation: {
    type:Number
  },
  status: {
    type: String
  }
},
{ timestamps: true, versionKey: false })

module.exports = mongoose.model('Classes', ClassSchema)
