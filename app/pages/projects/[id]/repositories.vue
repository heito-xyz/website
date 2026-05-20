<template>
    <div>
        Repositories
    </div>
</template>

<script lang="ts" setup>

// * Types
import type { Project } from '~~/types/api/project';


const props = defineProps<{
    project: Project;
}>();


definePageMeta({
    alias: [
        '/projects/:id/repos',
        '/project/:id/repos',
        '/p/:id/repos',
    ]
});

</script>

<style lang="scss" scoped></style>