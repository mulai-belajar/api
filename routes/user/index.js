const express = require('express')
const router = express.Router()

const usercontroller = require('../../controllers/user')
const helpers = require("../../helpers/user-token")

/* GET /user +  */
router.get('/',  helpers.isAuthenticated, usercontroller.get)

/* GET User by id */
router.get(`/:id`, usercontroller.getById)

/* GET User bypass */
//router.get("/bypass", usercontroller.getBypass)

/* POST User */
router.post(`/register`, usercontroller.register)

/* LOGIN User */
router.post("/login", usercontroller.login)

/* LOGOUT User*/
//router.put("/logout", helpers.isAuthenticated, usercontroller.logout)

/* DELETE User */
router.delete("/", usercontroller.delete)

/* DELETE User by id */
// router.delete("/:id", helpers.isAuthenticated, usercontroller.deleteById)

// router.put("/:id", helpers.isAuthenticated, usercontroller.putById)
module.exports = router
