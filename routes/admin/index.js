const express = require('express')
const router = express.Router()

const admincontroller = require('../../controllers/admin')
const helpers = require("../../helpers/admin-token")

/* GET Admin. */
router.get('/', helpers.isAuthenticated, admincontroller.get)

/* Get Admin by id */
router.get(`/:id`, helpers.isAuthenticated, admincontroller.getById)

/* GET Admin bypass */
router.get("/bypass", admincontroller.getBypass)

/* POST Admin */
router.post(`/register`, admincontroller.register)

/* LOGIN Admin */
router.post("/login", admincontroller.login)

/* LOGOUT Admin*/
router.put("/logout", helpers.isAuthenticated, admincontroller.logout)

// router.delete("/", helpers.isAuthenticated, admincontroller.delete)
// router.delete("/:id", helpers.isAuthenticated, admincontroller.deleteById)

// router.put("/:id", helpers.isAuthenticated, admincontroller.putById)

module.exports = router
