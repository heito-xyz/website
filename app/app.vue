<template>
    <ClientOnly>
        <Notifications/>
    </ClientOnly>

    <NuxtLayout
        :isActiveSuperMenu="isActiveSuperMenu"
        @closeSuperMenu="isActiveSuperMenu = false"
    >
        <Header v-if="!$route.meta.flags?.includes('header:hide')"
            @openSuperMenu="isActiveSuperMenu = true"
        />

        <NuxtPage class="page"
            :style="{ padding: $route.meta?.header?.padding ?? '0 32px' }"
        />

        <Footer v-if="!$route.meta.flags?.includes('footer:hide')"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>

// * Components
import Header from '~/components/header/Index.vue';
import Notifications from '~/components/notifications/Index.vue';
import Footer from '~/components/footer/Index.vue';


// * Stores
const { locale } = useI18n();


const isActiveSuperMenu = ref(false);


useHead({
    titleTemplate(title) {
        return (title ? `${title} / ` : '') + 'heito.xyz';
    },
    htmlAttrs: {
        lang: locale || 'en',
        class: import.meta.server ? 'dark' : (localStorage['theme'] === 'dark' ? 'dark' : 'light')
    }
});

</script>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.layout {
    max-height: 100dvh !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    overflow-x: hidden;
}

</style>