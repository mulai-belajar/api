var express = require('express');
var router = express.Router();

const adminController = require('../../controllers/admin')

/* GET home page. */
router.get('/', adminController.list)

module.exports = router;
