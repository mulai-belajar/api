const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../../models/user")
const helpers = require("../../helpers/user-token")

module.exports = {
  /* GET /user */
  get: (req, res) => {
    User.find({})
      .populate({
        path: "posts"
      })
      .exec((err, user) => {
        res.send({
          data: user
        })
      })
  },

  // ---------------------------------------------------------------------------
  // GET /user/bypass
  getBypass: (req, res) => {
    User.find({})
      .populate({
        path: "posts"
      })
      .exec((err, user) => {
        res.send({
          data: user
        })
      })
  },

  // ---------------------------------------------------------------------------
  // GET /user/:id
  getById: (req, res) => {
    User.findOne({id: Number(req.params.id)}, (err, user) => {
      res.send({
        params: req.params,
        data: user
      })
    })
  },

  // ---------------------------------------------------------------------------
  // GET /user?fullaname=yourname&email=yourname@domain.com
  getByQuery: (req, res) => {
    const query = {
      fullname: req.params.fullname,
      email: req.params.email,
      phone: req.params.phone,
      address: req.params.address,
      dateofbirth: req.params.dateofbirth,
      sex: req.params.sex,
      occupation: req.params.occupation,
      workplace: req.params.workplace,
      organization: req.params.organization,
      class: req.params.class
    }

    User.findOne(query, (error, user) => {
      res.send({
        params: req.params,
        data: user
      })
    })
  },

  // ---------------------------------------------------------------------------
  // DELETE /user
  delete: (req, res) => {
    User.remove({}, (error) => {
      if (error) res.status(400).json({error: error})
      res.status(200).send({message: "All user have been removed."})
    })
  },

  // ---------------------------------------------------------------------------
  // POST /user/register
  register: (req, res) => {
    const body = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = new User(body)
    delete body.password

    newUser.save((error) => {
      if (error) res.send("error")
      else {
        res.send({
          registered: body,
          success: true
        })
      }
    })
  },

  // ---------------------------------------------------------------------------
  // POST /user/login
  login: (req, res) => {
    // Create body object
    const body = {
      email: req.body.email,
      password: req.body.password
    }

    // Find one user by email
    User.findOne({email: body.email})
      .then((user) => {
        const validPassword = bcrypt.compareSync(
          body.password,
          user.password
        )

        // console.log(validPassword)

        // console.log(">>> user found:", user)
        // console.log({ validPassword })

        if (!user) {
          // (1) If user is not found
          res.send({
            message: `Login failed because user with email '${
              body.email
            }' is not found`
          })
        } else if (!validPassword) {
          // (2) If the found user is logged in with unmatched password
          res.send({
            message: `Sign in failed because password of '${fullname}' is not match.`
          })
        } else {
          // (3) If the found user is matched with the password
          // console.log({ user })

          // (4) Create token content and config
          let content = {
            payload: {
              // or claims
              iss: process.env.URL, // ISSUER: DOMAIN/URL of the service
              sub: user._id, // SUBJECT: OID/UID/UUID/GUID
              id: user.id, // USERID: Sequential ID
              fullname: user.fullname, // NAME: Full name
              email: user.email // EMAIL: Email address
            },
            secret: process.env.JWT_SECRET,
            options: {
              expiresIn: "30d" // EXPIRATION: 30 days
            }
          }
          // console.log({ content })

          // (5) Generate a token
          const token = helpers.generateJWT(content)
          // console.log({ token })

          // (6) Set logged in status
          helpers.setLoggedIn(user, true)

          // (7) Finally send that token
          res.send({
            message: "You are logged in",
            email: body.email,
            token: token
          })
        }
      })
      .catch((err) => {
        // If there's an error while finding the user
        if (err)
          res.send({
            message: `Something went wrong when try to logging in`
          })
      })
    // Finished sign in
  },

  // ---------------------------------------------------------------------------
  // GET /user/logout
  logout: (req, res) => {
    const decoded = {
      id: req.decoded.id
    }

    // (6) Set logged in status
    helpers.setLoggedIn(decoded, false)

    res.send({
      message: `User with id: ${decoded.id} is logged out`
    })
  }
}
