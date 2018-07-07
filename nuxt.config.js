module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wconsole',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
        { src: "https://www.gstatic.com/firebasejs/5.2.0/firebase.js", type: "text/javascript" },
        { src: "/js/firebase.js", type: "text/javascript" },
    ]
  },
  css: [
      { src: '~static/css/bootstrap.min.css', lang: 'css'},
      { src: '~static/css/global.css', lang: 'css' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
