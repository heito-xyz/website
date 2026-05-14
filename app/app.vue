<template>
    <NuxtLayout class="layout">
        <Header v-if="!$route.meta.flags?.includes('header:hide')"/>

        <NuxtPage class="page"/>

        <Footer v-if="!$route.meta.flags?.includes('footer:hide')"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>

// * Components
import Header from '~/components/header/Index.vue';
import Footer from '~/components/footer/Index.vue';


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