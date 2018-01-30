require('dotenv').config()

module.exports = {
  env: {
    baseApiUrl: process.env.BASE_API_URL || 'http://localhost:8080',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
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
      {rel: 'stylesheet', href: '/assets/custom.css'},
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Pangolin'}
    ],
  },
  css: ['@assets/css/styles.css'],
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
        const cssLoader = config.module.rules.find((loader) => loader.test.toString() === '/\\.css$/')
        cssLoader.use.push('postcss-loader')
      }
    },
  },
}
