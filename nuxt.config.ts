export default defineNuxtConfig({
  head: {
    title: 'صارح',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  },
  css: [
      // Sass
      "~/scss/resets.scss",
      "~/scss/main.scss",
      "~/scss/responsive.scss",
      "~/scss/helpers/_variables.scss",
      "~/scss/helpers/_mixins.scss",
      // FontAwesome
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})