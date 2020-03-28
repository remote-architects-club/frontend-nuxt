module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   extends: [
//     // 'eslint:recommended',
//     '@nuxtjs',
//     'prettier',
//     'prettier/vue',
//     'plugin:vue/strongly-recommended',
//     'plugin:prettier/recommended',
//     'plugin:nuxt/recommended',
//     'plugin:cypress/recommended'
//   ],
//   plugins: ['prettier', 'vue'],
//   // add your custom rules here
//   rules: {}
// }
