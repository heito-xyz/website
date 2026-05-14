// * Types
import { languages, type CodeName } from './types/locale';


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

    i18n: {
        strategy: 'no_prefix',
        defaultLocale: 'en',
        locales: Object.keys(languages).map(code => ({
            code,
            name: languages[code as CodeName].name,
            file: code + '.json'
        }))
    },

    runtimeConfig: {
        apiUrl: process.env.API_URL || 'https://api.heito.xyz',
        wsUrl: process.env.WS_URL || 'wss://api.heito.xyz',
    }
});