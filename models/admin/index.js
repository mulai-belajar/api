const bcrypt = require("bcryptjs")
const mongoose = require(`mongoose`)
const sequence = require("mongoose-sequence")(mongoose)
const AdminSchema = mongoose.Schema

// PRECONFIGURATION

const modelName = "Admin"

const SALT_WORK_FACTOR = 8

/* Create Admin Schema */
const admin = new AdminSchema(
  {
  // Internal
  id: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    hash: String,
    salt: String,
    required: true,
    login: {
      type: Boolean,
      default: false
  },
  login_token: {
    type: String,
    default: ""
  },
  reset_token: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: "https://mulaibelajar.com"
  },
 },
},
  { timestamps: true, versionKey: false } // Created & Updated At
)

// Auto increment adminId
admin.plugin(sequence, { id: "admin_counter", inc_field: "id" })

// MIDDLEWARES
// - ROLES ASSIGNER
// - PASSWORD HASH + SALT GENERATOR

// BEWARE! We cannot define the same mongoose middlewares separately
admin.pre("save", function(next) {
  if (!this.isModified("password")) return next()
  else {
    // Generate salt with predefined factor
    // BEWARE! We cannot do these in synchronous way
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err)
      else {
        // Generate hash with current plain password and salt
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err)
          else {
            // override the clear text password with the hashed one
            this.password = hash
            this.hash = hash
            this.salt = salt
            return next() // finally!
          }
        })
      }
    })
  }
})



admin.pre("find", function(next) {
  this.select({
    password: 0,
    hash: 0,
    salt: 0,
    login: 0,
    login_token: 0,
    reset_token: 0
  })
  next()
})

admin.pre("findOne", function(next) {
  this.select({
    hash: 0,
    salt: 0
  })
  next()
})

// Set updatedAt timestamp
admin.pre("update", function() {
  this.update(
    {},
    {
      $set: { updatedAt: new Date() }
    }
  )
})

module.exports = mongoose.model(modelName, admin);
