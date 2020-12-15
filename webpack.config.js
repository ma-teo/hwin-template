const clientConfig = require('./config/client')
const serverConfig = require('./config/server')

module.exports = env => [
  clientConfig(env),
  serverConfig(env)
]
