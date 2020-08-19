const path = require('path')
const port = process.env.PORT || 5000
const staticRoot = process.env.ROOT || 'public'
const USER_NAME = process.env.USER_NAME || 'user'
const PASSWORD = process.env.PASSWORD || 'password';

const fastify = require('fastify')({
  logger: true,
})

function validate(username, password, req, reply, done) {
  if (username === USER_NAME && password === PASSWORD) {
    done()
  } else {
    done(new Error('Winter is coming'))
  }
}

fastify.register(require('fastify-basic-auth'), {
  validate,
  authenticate: true,
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, staticRoot),
})

fastify.listen(port, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})

fastify.after(() => {
  fastify.addHook('onRequest', fastify.basicAuth)
})
