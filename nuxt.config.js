export default {
  mode: 'universal',
  env: {
    MAPBOX_API_ACCESS_TOKEN: process.env.MAPBOX_API_ACCESS_TOKEN,
    GRAPHQL_URI: process.env.GRAPHQL_URI
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Remote Architects Club',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Stories, tools, and links for architects working remotely.'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  // css: ['@/assets/css/animate.min.css'],
  purgeCSS: {
    whitelist: ['']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vue-debounce.js',
    { src: '@/plugins/datepicker.js', ssr: false },
    '@/plugins/global-components.js',
    '@/plugins/fsm-machines.js',
    '@plugins/spinner.js'
    // '@/plugins/portal-vue.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',

    [
      '@nuxtjs/date-fns',
      {
        methods: ['format', 'formatDistanceToNow']
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
    'nuxt-rfg-icon',
    '@nuxtjs/sentry',
    '@nuxtjs/auth',
    'nuxt-logrocket'
  ],
  sentry: {
    dsn: 'https://ef5a8da5a37d48d0a0ad8b746bb26990@sentry.io/5174207', // Enter your project's DSN here
    config: {} // Additional config
  },
  logRocket: {
    logRocketId: 'vyyku1/remote-architects-club',
    devModeAllowed: false
  },
  auth: {
    strategies: {
      auth0: {
        domain: 'remotearchitectsclub.eu.auth0.com',
        client_id: 'd0g9ZVJB0iSJc38EKqyngz1gMH6ed37q'
      }
    },
    redirect: {
      login: '/admin/login',
      logout: '/',
      callback: '/admin/login',
      home: '/admin'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      config.module.noParse = /(mapbox-gl)\.js$/
    }
  }
}
