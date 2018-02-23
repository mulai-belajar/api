const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  image_url: {
    type: String
  }
},
{ timestamps: true, versionKey: false })

module.exports = mongoose.model('Categories', CategorySchema)
