// based on https://github.com/samtgarson/nuxt-env
const path = require('path')
const middleware = require('./middleware')

module.exports = function EnvModule ({ keys }) {
  if (!keys || keys.length <= 0) keys = Object.keys(this.options.env)
  this.addServerMiddleware(middleware(keys))

  const src = path.resolve(__dirname, 'plugin.js')
  this.addPlugin({
    src,
    filename: 'env'
  })
}
