const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Admin = require(`../../models/admin`)
const helpers = require("../../helpers/admin-token")

module.exports = {
/* Get /admin */
get: (req, res) => {
  Admin.find({})
    .populate({
      path: "posts"
    })
    .exec((err, admin) => {
      res.send({
        data: admin
      })
    })
},

// ---------------------------------------------------------------------------
// GET /admin/bypass
getBypass: (req, res) => {
  Admin.find({})
    .populate({
      path: "posts"
    })
    .exec((err, admin) => {
      res.send({
        data: admin
      })
    })
},

// ---------------------------------------------------------------------------
// GET /admin/:id
getById: (req, res) => {
  Admin.findOne({id: Number(req.params.id)}, (err, admin) => {
    res.send({
      params: req.params,
      data: admin
    })
  })
},

// ---------------------------------------------------------------------------
// GET /admin?&email=yourname@domain.com
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

  Admin.findOne(query, (error, admin) => {
    res.send({
      params: req.params,
      data: admin
    })
  })
},

// ---------------------------------------------------------------------------
// DELETE /admin
delete: (req, res) => {
  Admin.remove({}, (error) => {
    if (error) res.status(400).json({error: error})
    res.status(200).send({message: "All admin have been removed."})
  })
},

// ---------------------------------------------------------------------------
// POST /admin/register
register: (req, res) => {
  const body = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password
  }

  const newAdmin = new Admin(body)
  delete body.password

  newAdmin.save((error) => {
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
// POST /admin/login
login: (req, res) => {
  // Create body object
  const body = {
    email: req.body.email,
    password: req.body.password
  }

  // Find one admin by email
  Admin.findOne({email: body.email})
    .then((admin) => {
      const validPassword = bcrypt.compareSync(
        body.password,
        admin.password
      )

      // console.log(validPassword)

      // console.log(">>> admin found:", admin)
      // console.log({ validPassword })

      if (!admin) {
        // (1) If admin is not found
        res.send({
          message: `Login failed because admin with email '${
            body.email
          }' is not found`
        })
      } else if (!validPassword) {
        // (2) If the found admin is logged in with unmatched password
        res.send({
          message: `Sign in failed because password of '${fullname}' is not match.`
        })
      } else {
        // (3) If the found admin is matched with the password
        // console.log({ admin })

        // (4) Create token content and config
        let content = {
          payload: {
            // or claims
            iss: process.env.URL, // ISSUER: DOMAIN/URL of the service
            sub: admin._id, // SUBJECT: OID/UID/UUID/GUID
            id: admin.id, // ADMINID: Sequential ID
            fullname: admin.fullname, // NAME: Full name
            email: admin.email // EMAIL: Email address
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
        helpers.setLoggedIn(admin, true)

        // (7) Finally send that token
        res.send({
          message: "You are logged in",
          email: body.email,
          token: token
        })
      }
    })
    .catch((err) => {
      // If there's an error while finding the admin
      if (err)
        res.send({
          message: `Something went wrong when try to logging in`
        })
    })
  // Finished sign in
},

// ---------------------------------------------------------------------------
// GET /admin/logout
logout: (req, res) => {
  const decoded = {
    id: req.decoded.id
  }

  // (6) Set logged in status
  helpers.setLoggedIn(decoded, false)

  res.send({
    message: `Admin with id: ${decoded.id} is logged out`
  })
}
