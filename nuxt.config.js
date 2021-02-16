export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          '"https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-logrocket',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],

  bootstrapVue: {
    icons: true
  },
  /*
   ** Build configuration
   */

  logRocket: {
    logRocketId: 'efrei/bibliotech',
    devModeAllowed: false,
  },

  axios: {
    baseURL: 'https://bibliotech-serveur.herokuapp.com/api/',
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
