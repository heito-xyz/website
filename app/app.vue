<template>
    <NuxtLayout class="layout">
        <NuxtPage class="page"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>

useHead({
    titleTemplate(title) {
        return (title ? `${title} / ` : '') + 'heito.xyz';
    },
    htmlAttrs: {
        class: 'dark'
    }
});

</script>