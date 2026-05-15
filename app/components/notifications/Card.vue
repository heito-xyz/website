<template>
    <div :class="['notification', { hide }]">
        <slot name="before"></slot>

        <header>
            <div class="picture" v-if="notification.image || notification.icon"
                :class="{
                    image: notification.image !== null,
                    icon: notification.icon !== null
                }"
            >
                <Image :src="notification.image" v-if="notification.image !== null"/>

                <!-- <Icon :name="notification.icon" v-if="notification.icon !== null"/> -->
            </div>

            <div class="content">
                <div>{{ notification?.title }}</div>

                <div>{{ notification?.text }}</div>
            </div>
        </header>

        <AnimationHeight :showed="showButtons && notification?.buttons?.length! > 0">
            <ul class="buttons">
                <Button v-for="button of notification?.buttons" :key="button?.label"
                    variant="secondary"
                    
                    @click.stop.prevent="button?.click ? button?.click($event) : null"
                >
                    <div>
                        <div>{{ button?.label }}</div>

                        <div>{{ button?.text }}</div>
                    </div>
                </Button>
            </ul>
        </AnimationHeight>

        <ul class="options" v-show="showOptions && notification?.mode === 'fixed'">
            <li @click.stop.prevent="$emit('hide')">
                <!-- <Icon name="minus"/> -->
                -
            </li>
        </ul>

        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

// * Types
import type { StoreNotification } from '~/libs/notifications';


const $emit = defineEmits({
    hide() {}
});

const props = defineProps<{
    notification: StoreNotification;
    showButtons?: boolean;
    showOptions?: boolean;
}>();


const hide = ref<boolean>(false);

</script>

<style lang="scss" scoped>

.notification {
    pointer-events: all;
    padding: 12px;
    max-width: 512px;
    min-width: 215px;
    position: relative;
    border-radius: var(--hx-border-radius);
    border: 1px solid var(--hx-background-transparent);
    background-color: #00000055;
    backdrop-filter: blur(10px);
    transition: .2s;

    header {
        display: flex;
        position: relative;
        align-items: center;

        .picture {
            margin-right: 12px;
            position: relative;

            &.icon {
                max-width: 32px;
                min-width: 32px;
                height: 32px;
            }

            &.image {
                max-width: 48px;
                min-width: 48px;
                height: 48px;
            }

            &.image.icon {
                .img {
                    mask-image: radial-gradient(circle 12px at center, transparent 100%, green 0%);
                    mask-size: 84px 84px, 100%;
                    -webkit-mask-image: radial-gradient(circle 12px at center, transparent 100%, green 0%);
                    -webkit-mask-size: 84px 84px, 100%;
                }
                
                .ui-icon {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    bottom: -6px;
                    right: -6px;
                    border-radius: 50%;
                    z-index: 2;

                    &::after {
                        background-color: transparent;
                    }
                }
            }

            :deep(.ui-image) {
                width: 100%;
                height: 100%;
                border-radius: var(--hx-border-radius);
            }
        }

        .content {
            max-width: 100%;
            min-width: 0;

            div {
                max-width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;

                &:nth-child(1) {
                    font-size: 14px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                &:nth-child(2) {
                    display: -webkit-box;
                    color: var(--hx-text-secondary);
                    font-size: 12px;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    ul.buttons {
        display: grid;
        margin-top: 8px;
        border-radius: var(--hx-border-radius);
        grid-template-columns: repeat(2, 1fr);
        gap: 2px;
        overflow: hidden;
        user-select: none;

        :deep(.ui-button) {
            border-radius: 0;
            font-size: 12px;
        }
    }

    ul.options {
        position: absolute;
        right: -10px;
        top: -10px;

        li {
            cursor: pointer;
            display: flex;
            width: 20px;
            height: 20px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 1px solid var(--hx-background-transparent);
            background-color: var(--hx-background-secondary);

            i {
                font-size: 14px;
            }
        }
    }
}

</style>