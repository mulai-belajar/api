const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

/* Create Admin Schema */
let adminSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

module.exports = mongoose.model(`Admin`, adminSchema);
