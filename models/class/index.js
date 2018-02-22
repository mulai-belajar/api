// {
//   "id": 0,
//   "name": "",
//   "categories": "",
//   "address": "",
//   "description": "",
//   "total_donation": "",
//   "status": "",
//   "image_url": "",
//   "duration": "",
//   "created_at": "",
//   "updated_at": ""
// }

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
