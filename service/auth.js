const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://mulaibelajar.auth0.com/.well-known/jwks.json'
  }),

  audience: 'http://api.mulaibelajar.com',
  issuer: 'https://mulaibelajar.auth0.com/',
  algorithms: ['RS256']
})

const checkScopes = jwtAuthz(['read:api'])

module.exports = {
  checkJwt,
  checkScopes
}
