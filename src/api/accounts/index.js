let express = require("express")
let router = express.Router()

let controller = require("./controller")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.put("/logout, helpers.isAuthenticated, controller.logout")

router.get("/", helpers.isAuthenticated, controller.get)
router.get("/:id", helpers.isAuthenticated, controller.get)

module.exports = router
