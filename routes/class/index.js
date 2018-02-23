const express = require('express')
const router = express.Router()
const classController = require('../../controllers/class')

// GET all data
router.get('/', classController.get)

// GET a class
router.get('/:id', classController.getById)

// POST a class
router.post('/', classController.post)

// PUT a class
router.put('/:id', classController.put)

// DELETE a class
router.delete('/:id', classController.delete)

module.exports = router
