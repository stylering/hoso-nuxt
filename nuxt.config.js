
const adapterScreen = require('./commons/utils/adapterScreen');

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '货色HOSO — 只做原创品牌',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { innerHTML: adapterScreen, type: 'text/javascript' },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'assets/styles/reset.css',
    'assets/styles/common.scss',
  ],

  styleResources: {
    scss: ['./assets/styles/mixins.scss']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/lazyload.client.js', mode: 'client' },
    { src: '~/plugins/toast.client.js', mode: 'client' },
    { src: '~/plugins/vueInfiniteScroll.client.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
  ],
  axios: {
    proxy: true,
    baseURL: 'https://t.hososhop.com'
  },
  proxy: {
    '/api': {
      target: 'https://t.hososhop.com'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
