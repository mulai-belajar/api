const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/category')
const authService = require('../../service/auth')

// GET all data
router.get('/', authService.checkJwt, authService.checkScopes, categoryController.get)

// GET a class
router.get('/:id', authService.checkJwt, authService.checkScopes, categoryController.getById)

// POST a class
router.post('/', authService.checkJwt, authService.checkScopes, categoryController.post)

// PUT a class
router.put('/:id', authService.checkJwt, authService.checkScopes, categoryController.put)

// DELETE a class
router.delete('/:id', authService.checkJwt, authService.checkScopes, categoryController.delete)

module.exports = router
