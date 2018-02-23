const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/category')

// GET all data
router.get('/', categoryController.get)

// GET a class
router.get('/:id', categoryController.getById)

// POST a class
router.post('/', categoryController.post)

// PUT a class
router.put('/:id', categoryController.put)

// DELETE a class
router.delete('/:id', categoryController.delete)

module.exports = router
