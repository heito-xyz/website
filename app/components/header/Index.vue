<template>
    <header ref="header"
        :class="{ blur: isBlured }"
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

        <Account style="margin: 0 12px;"/>

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

// * Components
import Account from './Account.vue';

// * Icons
import { Bell } from 'lucide-vue-next';


// * Stores
const { $notifications } = useNotificationsStore();


const header = ref<HTMLDivElement | null>(null);

const $emit = defineEmits({
    openSuperMenu() {}
});


const isBlured = ref(false);


function handleLayoutScroll(event: Event) {
    const target = event.target as HTMLDivElement;

    isBlured.value = target.scrollTop >= 1;
}


onMounted(() => {
    const layout = document.querySelector('.layout') as HTMLDivElement;

    if (layout) layout.addEventListener('scroll', handleLayoutScroll);
});

onUnmounted(() => {
    const layout = document.querySelector('.layout') as HTMLDivElement;

    if (layout) layout.removeEventListener('scroll', handleLayoutScroll);
});

</script>

<style lang="scss" scoped>

header {
    display: flex;
    padding: 0 32px;
    //width: 100vw;
    height: 64px;
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px dashed transparent;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    transition: .2s, heigth .1s;
    z-index: 100;

    &.blur {
        height: 52px;
        border-bottom: 1px dashed var(--hx-background-transparent);
        backdrop-filter: blur(10px);
    }
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

.links {
    display: flex;
    margin: 0 12px;
    align-items: center;
    list-style-type: none;
    gap: 8px;

    a {
        cursor: pointer;
        font-size: 12px;
        color: var(--hx-text-secondary);
        transition: .2s;
        opacity: .7;

        &:hover {
            text-decoration: underline;
            opacity: 1;
        }
    }
}

:deep(.header-toggles) {
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