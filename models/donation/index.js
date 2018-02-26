const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sequence = require('mongoose-sequence')(mongoose)

const DonationSchema = new Schema({
  id: {
    type: Number
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  donatur: {
    type: String
  },
  amount: {
    type: Number
  }
},
{ timestamps: true, versionKey: false })

DonationSchema.plugin(sequence, { id: 'donation_counter', inc_field: 'id' })

module.exports = mongoose.model('Donation', DonationSchema)
