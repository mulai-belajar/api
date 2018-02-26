const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sequence = require('mongoose-sequence')(mongoose)

const CategorySchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  class: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
  ]
},
{ timestamps: true, versionKey: false })

CategorySchema.plugin(sequence, { id: 'category_counter', inc_field: 'id' })

module.exports = mongoose.model('Category', CategorySchema)
