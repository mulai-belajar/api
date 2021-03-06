const jwt = require("jsonwebtoken")

const Admin = require("../models/admin")

module.exports = {
  generateJWT: (content) => {
    const token = jwt.sign(content.payload, content.secret, content.options)
    return token
  },

  setLoggedIn: (body, condition) => {
    Admin.findOneAndUpdate(
      {
        id: body.id
      },
      {
        $set: {
          login: condition
        }
      },
      {
        new: true
      },
      (error, resource) => {
        console.log(`Admin with id ${body.id} is logged out`)
      }
    )
  },

  isAuthenticated: (req, res, next) => {
    // (1) Check for token from various ways
    const token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization.split(" ")[1] ||
      undefined

    // (2) There's a token coming in!
    // console.log({ token })

    // (3A) Decode the token if it's available
    if (token !== undefined) {
      // (4) Verifies JWT token with provided secret and checks expiration
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        // (5) If there is an error when verifying the token...
        if (error) {
          res.send({
            message: "Failed to authenticate token.",
            error: error
          })
        } else {
          // (6) If everything is good, save to request for use in other routes
          req.decoded = decoded
        }

        // console.log({ decoded: req.decoded })

        // (7) Find the admin based on the token _id/subject
        Admin.findById(decoded.sub, (error, admin) => {
          // console.log({ admin })

          // (8) If there is no associated acccount...
          if (error || !admin) {
            res.send({
              message: "No admin is associated with that token.",
              error: error
            })
          } else {
            // (9) The valid admin is found!
            // That actual admin is authenticated with valid token
            // console.log({ admin })
            return next()
          }
        })
      })
    } else {
      // (3B) When there's no token
      res.status(400).send({
        message:
          "Sorry, no access without an active access token that must be used to query information."
      })
    }
    // Finish token checker for authentication
  }
}
