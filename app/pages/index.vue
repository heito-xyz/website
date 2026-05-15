<template>
    <main class="home">
        <div class="soon">Space is coming soon</div>
        
        <h1>heito</h1>

        <p>Do you want to find something here?</p>
    </main>
</template>

<script lang="ts" setup>

useSeoMeta({
    title: 'Home'
});

</script>

<style lang="scss" scoped>

.page.home {
    display: flex;
    width: 100vw;
    height: calc(100vh - 128px);
    padding: 32px 32px;
    position: relative;
    align-items: start;
    justify-content: end;
    flex-direction: column;
    box-sizing: border-box;

    h1 {
        font-size: 128px;
        font-family: 'Cormorant Garamond', serif;
        text-transform: uppercase;
    }

    p {
        font-size: 14px;
        opacity: .7;
    }

    .soon {
        padding: 12px;
        align-self: center;
        position: absolute;
        top: 50%;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: var(--hx-border-radius);
        border: 1px solid var(--hx-background-transparent);
        background-color: var(--hx-background-secondary);
        transform: translateY(-50%);
    }
}

</style>