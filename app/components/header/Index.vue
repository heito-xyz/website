<template>
    <header
        :style="{ padding: $route.meta?.header?.padding ?? '0 32px' }"
    >
        <div class="logo">
            <img src="/favicon.ico" alt="Logo">
            
            <div>
                <NuxtLink to="/">heito.xyz</NuxtLink>

                <div class="online"></div>
            </div>
        </div>

        <div style="margin-left: auto;"></div>

        <div>A?</div>
    </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>

header {
    display: flex;
    padding: 0 32px;
    width: 100vw;
    height: 64px;
    position: sticky;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    transition: .2s;
    z-index: 100;
}

.logo {
    display: flex;
    align-items: center;

    a {
        color: var(--text-primary);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

.super {
    cursor: pointer;
    display: flex;
    position: relative;
    width: 20px;
    height: 16px;
    flex-direction: column;
    justify-content: space-between;

    div {
        width: 100%;
        border-radius: 5px;
        border-bottom: 1px solid var(--background-secondary);
        transition: .2s;
    }
}

</style>