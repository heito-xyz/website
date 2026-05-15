<template>
    <ClientOnly>
        <SuperMenu v-if="isActiveSuperMenu"
            @close="isActiveSuperMenu = false"
        />
    </ClientOnly>

    <NuxtLayout class="layout"
        :isActiveSuperMenu="isActiveSuperMenu"
    >
        <Header v-if="!$route.meta.flags?.includes('header:hide')"
            @openSuperMenu="isActiveSuperMenu = true"
        />

        <NuxtPage class="page"/>

        <Footer v-if="!$route.meta.flags?.includes('footer:hide')"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>

// * Components
import Header from '~/components/header/Index.vue';
import SuperMode from '~/components/super-menu/Index.vue';
import Footer from '~/components/footer/Index.vue';


const isActiveSuperMenu = ref(false);


useHead({
    titleTemplate(title) {
        return (title ? `${title} / ` : '') + 'heito.xyz';
    },
    htmlAttrs: {
        class: 'dark'
    }
});

</script>

<style lang="scss">

.layout {
    max-height: 100dvh !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    overflow-x: hidden;
}

</style>