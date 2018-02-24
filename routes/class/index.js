const express = require('express')
const router = express.Router()
const classController = require('../../controllers/class')
const authService = require('../../service/auth')

// GET all data
router.get('/', classController.get)

// GET a class
router.get('/:id', authService.checkJwt, authService.checkScopes, classController.getById)

// POST a class
router.post('/', authService.checkJwt, authService.checkScopes, classController.post)

// PUT a class
router.put('/:id', authService.checkJwt, authService.checkScopes, classController.put)

// DELETE a class
router.delete('/:id', authService.checkJwt, authService.checkScopes, classController.delete)

module.exports = router
