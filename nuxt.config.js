require('dotenv').config()

module.exports = {
  env: {
    baseApiUrl: '//' + (process.env.SERVER_HOSTNAME + ':' +
      process.env.SERVER_HTTP_PORT) || 'http://localhost:8080',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'caesarapp-web-client',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Web client for caesarapp.',
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
  },
  css: [],
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
