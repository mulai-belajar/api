var express = require('express');
var router = express.Router();
const authService = require('../service/auth')

// GET all data
router.get('/public', (req,res) => {
  res.json({
    messages: 'Get public data'
  })
})

router.get('/private', authService.checkJwt, (req,res) => {
  res.json({
    messages : 'Get private data. Congratulations'
  })
})

router.get('/private-scopes', authService.checkJwt, authService.checkScopes, (req,res) => {
  res.json({
    messages : 'Get private data with scopes. Congratulations'
  })
})

module.exports = router;
