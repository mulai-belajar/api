const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sequence = require('mongoose-sequence')(mongoose)

const ClassSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  now_donation: {
    type: Number,
    default: 0
  },
  total_donation: {
    type:Number
  },
  status: {
    type: String
  },
  created_by: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }

},
{ timestamps: true, versionKey: false })

ClassSchema.plugin(sequence, { id: 'class_counter', inc_field: 'id' })

module.exports = mongoose.model('Class', ClassSchema)
