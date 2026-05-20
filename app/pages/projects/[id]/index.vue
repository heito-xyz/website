<template>
</template>

<script lang="ts" setup>

const $route = useRoute();
const $router = useRouter();


onMounted(() => {
    $router.push(`/project/${$route.params.id}/members`);
});

</script>

<style lang="scss" scoped></style>