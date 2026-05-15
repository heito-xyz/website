<template>
    <div class="super-menu">
        <Button @click="$emit('close')">
            <span>Close</span>
        </Button>
    </div>
</template>

<script lang="ts" setup>

const $emit = defineEmits({
    close() {}
});

</script>

<style lang="scss" scoped>

.super-menu {
    display: flex;
    padding: 5vw;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    align-items: start;
    justify-content: end;
    box-sizing: border-box;
    z-index: 1000;
}

</style>