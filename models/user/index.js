const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const sequence = require("mongoose-sequence")(mongoose)
const userSchema = mongoose.Schema

// -----------------------------------------------------------------------------
// PRECONFIGURATION

const modelName = "User"

const SALT_WORK_FACTOR = 8

/* Create User Schema */
const user = new userSchema(
  {
    // Internal
    fullname: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: String,
    hash: String,
    salt: String,
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
    // Profile
    phone: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: "https://mulaibelajar.com"
    },
    bio: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    dateofbirth: {
      type: Date,
      default: ""
    },
    sex: {
      type: Boolean
    },
    occupation: {
      type: String,
      default: ""
    },
    workplace: {
      type: String,
      default: ""
    },
    organization: {
      type: String,
      default: ""
    },
    class: {
      type: Array
    },
    status: {
      type: Boolean
    },
    donation: {
      type: Number
    },
    posts: [
      {
        type: userSchema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  { timestamps: true }
)

// -----------------------------------------------------------------------------
// GENERATED FIELDS

// Auto increment userId
user.plugin(sequence, { id: "user_counter", inc_field: "id" })

// -----------------------------------------------------------------------------
// MIDDLEWARES
// - ROLES ASSIGNER
// - PASSWORD HASH + SALT GENERATOR

// BEWARE! We cannot define the same mongoose middlewares separately
user.pre("save", function(next) {
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

// -----------------------------------------------------------------------------
// DATA POPULATION

user.pre("find", function(next) {
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

user.pre("findOne", function(next) {
  this.select({
    hash: 0,
    salt: 0
  })
  next()
})

// Set updatedAt timestamp
user.pre("update", function() {
  this.update(
    {},
    {
      $set: { updatedAt: new Date() }
    }
  )
})

// -----------------------------------------------------------------------------
// FINALLY REGISTER THE USERSCHEMA INTO MODEL

module.exports = mongoose.model(modelName, user)
