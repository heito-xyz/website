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

        <Group class="header-toggles">
            <Tooltip side="bottom">
                <template #trigger>
                    <Button
                        variant="ghost"
                        
                        @click="$notifications.setOpen(!$notifications.isOpened)"
                    >
                        <Bell/>
                    </Button>
                </template>

                <template #default>
                    <span>{{ $t('notifications') }}</span>
                </template>
            </Tooltip>
        </Group>

        <div class="super-menu-toggle"
            @click="$emit('openSuperMenu')"
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    </header>
</template>

<script lang="ts" setup>

// * Icons
import { Bell } from 'lucide-vue-next';


// * Stores
const { $notifications } = useNotificationsStore();


const $emit = defineEmits({
    openSuperMenu() {}
});

</script>

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
        font-size: 14px;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

:deep(.header-toggles) {
    margin-right: 12px;

    .ui-button {
        padding: 0;
        width: 24px;
        min-height: 24px;
        height: 24px;
        border-right: none !important;

        svg {
            width: 14px;
            height: 14px;
        }
    }
}

.super-menu-toggle {
    cursor: pointer;
    display: flex;
    position: relative;
    width: 20px;
    height: 16px;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        div {
            border-color: var(--hx-text-primary);
        }
    }

    div {
        width: 100%;
        border-radius: 5px;
        border-bottom: 1px solid var(--hx-background-secondary);
        transition: .2s;
    }
}

</style>