export default defineNuxtConfig({
    devtools: {
        enabled: true
    },

    css: ['~/assets/styles/root.scss'],

    modules: [
        '@heito/hxui/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/i18n'
    ],

    pinia: {
        storesDirs: ['./stores/**']
    },

    hxUI: {
        prefix: ''
    },

    runtimeConfig: {
        apiUrl: process.env.API_URL || 'https://api.heito.xyz',
        wsUrl: process.env.WS_URL || 'wss://api.heito.xyz',
    }
});