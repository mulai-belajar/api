var express = require('express');
var router = express.Router();
const authService = require('../service/auth')

// GET all data
router.get('/', (req,res) => {
  res.json({
    message: 'Connected to public data Mulai Belajar'
  })
})

router.get('/private', authService.checkJwt, (req,res) => {
  res.json({
    message : 'Get private data. Congratulations'
  })
})

router.get('/private-scopes', authService.checkJwt, authService.checkScopes, (req,res) => {
  res.json({
    message : 'Get private data with scopes. Congratulations'
  })
})

module.exports = router;
