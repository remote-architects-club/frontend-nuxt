import { client } from './plugins/apollo'
import gql from 'graphql-tag'
const PRIMARY_HOSTS = `remotearchitects.club`

let dynamicRoutes = async () => {
  const { data } = await client.query({
    query: gql`
      query allPosts {
        allPosts {
          slug
        }
      }
    `,
  })
  return data.allPosts.map((post) => `/blog/${post.slug}`)
}

export default {
  mode: 'universal',
  env: {
    MAPBOX_API_ACCESS_TOKEN: process.env.MAPBOX_API_ACCESS_TOKEN,
    GRAPHQL_URI: process.env.GRAPHQL_URI,
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
        content: 'Stories, tools, and links for architects working remotely.',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css',
      },
    ],
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
    whitelist: [''],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vue-debounce.js',
    { src: '@/plugins/datepicker.js', ssr: false },
    // '@/plugins/global-components.js',
    // '@/plugins/fsm-machines.js',
    '@plugins/spinner.js',
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
    '@nuxtjs/date-fns',
  ],
  dateFns: {
    methods: ['format', 'formatDistanceToNow'],
  },
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
    'nuxt-logrocket',
  ],
  components: true,
  sentry: {
    dsn: 'https://ef5a8da5a37d48d0a0ad8b746bb26990@sentry.io/5174207', // Enter your project's DSN here
    config: {}, // Additional config
  },
  logRocket: {
    logRocketId: 'vyyku1/remote-architects-club',
    devModeAllowed: false,
  },
  auth: {
    strategies: {
      auth0: {
        domain: 'remotearchitectsclub.eu.auth0.com',
        client_id: 'd0g9ZVJB0iSJc38EKqyngz1gMH6ed37q',
      },
    },
    redirect: {
      login: '/admin/login',
      logout: '/',
      callback: '/admin/login',
      home: '/admin',
    },
  },
  csp: {
    reportOnly: true,
    hashAlgorithm: 'sha256',
    policies: {
      'default-src': ["'self'"],
      'img-src': ['https:', '*.usefathom.com', 'data:', 'blob:'],
      'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
      'child-src': ['blob:'],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'fonts.googleapis.com',
        PRIMARY_HOSTS,
      ],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        PRIMARY_HOSTS,
        'sentry.io',
        '*.sentry-cdn.com',
        '*.usefathom.com',
        '*.logrocket.io',
      ],
      'connect-src': [
        PRIMARY_HOSTS,
        'sentry.io',
        '*.usefathom.com',
        'https://*.tiles.mapbox.com',
        'https://api.mapbox.com',
        'https://events.mapbox.com',
      ],
      'form-action': ["'self'"],
      'font-src': ['fonts.gstatic.com'],
      'frame-ancestors': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': [PRIMARY_HOSTS],
      'report-uri': [
        `https://o304029.ingest.sentry.io/api/5174207/security/?sentry_key=ef5a8da5a37d48d0a0ad8b746bb26990`,
      ],
    },
  },
  storybook: {
    stories: [],
    webpackFinal(config) {
      return config
    },
  },
  generate: {
    routes: dynamicRoutes,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend(config) {
      config.module.noParse = /(mapbox-gl)\.js$/
    },
  },
}
