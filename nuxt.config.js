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
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/animate.min.css'],
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
        /* module options */
        methods: ['format']
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/svg'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    // postcss: {
    //   // Add plugin names as key and arguments as value
    //   // Install them before as dependencies with npm or yarn
    //   plugins: {
    //     // Disable a plugin by passing false as value
    //     'postcss-url': false,
    //     'postcss-nested': {},
    //     'postcss-responsive-type': {},
    //     'postcss-hexrgba': {}
    //   },
    //   preset: {
    //     // Change the postcss-preset-env settings
    //     autoprefixer: {
    //       grid: true
    //     },
    //     features: {
    //       customProperties: false
    //     }
    //   }
    // },
    extend(config, ctx) {}
  }
}
