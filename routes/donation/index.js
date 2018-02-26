const express = require('express')
const router = express.Router()
const donationController = require('../../controllers/donation')
const authService = require('../../service/auth')

// GET all data
router.get('/', authService.checkJwt, authService.checkScopes, donationController.get)

// GET a class
router.get('/:id', authService.checkJwt, authService.checkScopes, donationController.getById)

// POST a class
router.post('/', authService.checkJwt, authService.checkScopes, donationController.post)

// PUT a class
router.put('/:id', authService.checkJwt, authService.checkScopes, donationController.put)

// DELETE a class
router.delete('/:id', authService.checkJwt, authService.checkScopes, donationController.delete)

module.exports = router
