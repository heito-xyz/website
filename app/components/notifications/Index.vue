<template>
    <div class="notifications">
        <Transition name="background">
            <div class="background" v-if="$notifications.isOpened"
                @click="$notifications.setOpen(false)"
            ></div>
        </Transition>

        <Transition name="new">
            <div class="content new" v-show="!$notifications.isOpened">
                <div class="plus" v-if="!$notifications.isOpened && listActiveNotifications.length > count">
                    +{{ listActiveNotifications.length - count }}
                </div>

                <TransitionGroup tag="ul" name="notification"
                    @enter="enterNotification"
                >
                    <Notification v-for="notification of listActiveNotifications.slice(0, count || 1)" :key="notification.id"
                        :id="String(notification.id)"

                        :notification="notification"
                        :show-buttons="true"
                        :show-options="true"

                        @click="openPanel"

                        @hide="hides[hides.has(notification.id) ? 'delete' : 'add'](notification.id)"
                    />
                </TransitionGroup>

                <AnimationHeight :showed="hides.size > 0">
                    <div class="hides" @click="hides.clear()">Показать все скрытые уведомления</div>
                </AnimationHeight>
            </div>
        </Transition>

        <Transition name="panel">
            <div class="panel" v-show="$notifications.isOpened">
                <header>
                    <Bell :size="18"/>

                    <span>{{ $t('notifications') }}</span>
                    
                    <X @click="$notifications.setOpen(false)"/>
                </header>

                <ul>
                    <Alert v-if="$notifications.length < 1">
                        <template #picture><BellOff/></template>
                        <template #title>{{ $t('emptyNotificationList') }}</template>
                    </Alert>

                    <template v-if="listFixedNotifications.length > 0">
                        <div>
                            <Notification v-for="notification of $notifications.filter(n => n?.mode === 'fixed')" :key="notification.id"
                                :notification="notification"
                                :show-buttons="true"
                            />
                        </div>
                    </template>

                    <div>
                        <template v-for="({ type, item }, idx) of listNotifications" :key="idx">
                            <Group v-if="type === 'group'"
                                :name="item.name!"
                                :group="(item as any)"
                            />
        
                            <Notification v-else-if="type === 'notification'"
                                :notification="(item as any)"
                                :show-buttons="true"
                            />
                        </template>
                    </div>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>

// * Components
import Group from './Group.vue';
import Notification from './Card.vue';

// * Icons
import { Bell, BellOff, X } from 'lucide-vue-next';

// * Stores
const { $notifications } = useNotificationsStore();


const hides = ref(new Set<number>());
const sizes = ref(new Map<number, number>());
const count = ref(1);


let maxSize = window.innerHeight - 256;


const listActiveNotifications = computed(() => {
    return $notifications.filter(notification => {
        return !hides.value.has(notification.id) && (notification.mode === 'fixed' || !notification?.hidden);
    }).sort((a, b) => a.mode === 'fixed' ? 1 : (a.createdAt > b.createdAt ? 1 : -1));
});

const listFixedNotifications = computed(() => {
    return $notifications.filter(n => n?.mode === 'fixed');
});

const listNotifications = computed(() => {
    const groups = $notifications.groups.filter(g => {
        return g.notifications.length > 0;
    });

    return [
        ...$notifications.filter(notification => notification?.mode !== 'fixed').map(n => ({
            type: 'notification',
            item: n,
            date: n.createdAt
        })),
        ...groups.map(group => {
            return {
                type: 'group',
                item: group,
                date: group.notifications[0]?.createdAt || 0
            }
        })
    ].sort((a, b) => a.date < b.date ? 1 : -1);
});


function openPanel() {
    $notifications.setOpen(true);

    listActiveNotifications.value.forEach(n => {
        if (n?.mode === 'fixed') return;

        n?.hide();
    });
}

function enterNotification(element: Element, done: () => void) {
    const id = Number(element.id);
    const notification = $notifications.get(id);

    const elementHeight = element.scrollHeight + 26;

    if (maxSize - elementHeight > 1) {
        maxSize = maxSize - elementHeight;
        count.value++;
    }

    done();

    if (!notification) return;

    if ($notifications.isOpened && notification.mode !== 'fixed') return notification.hide();

    if (notification.mode !== 'fixed') setTimeout(() => {
        notification.hide();

        maxSize = maxSize + elementHeight;
        count.value--;

        if (count.value < 1) {
            maxSize = window.innerHeight - 256;
            count.value = 1;
        }
    }, 7000);
}

</script>

<style lang="scss" scoped>

.notification-enter-active,
.notification-leave-active {
    margin: 0;
    padding: 0;
    max-height: 0px;
    height: 0px;
    transform: scale(0.8);
    opacity: 0;
}

.notifications {
    .background {
        pointer-events: all;
        width: 100dvw;
        height: 100dvh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #00000055;
        transition: .2s;
        z-index: 192;

        &-enter-active,
        &-leave-active {
            opacity: 0;
        }
    }

    .panel {
        pointer-events: all;
        display: flex;
        width: 376px;
        height: 100vh;
        position: fixed;
        right: 0;
        bottom: 0;
        flex-direction: column;
        border-left: 1px solid var(--hx-background-transparent);
        backdrop-filter: blur(10px);
        transition: all .5s;
        z-index: 193;

        &-enter-active,
        &-leave-active {
            transform: translateX(100%);
            opacity: 0;
        }

        header {
            display: flex;
            padding: 12px;
            align-items: center;
            border-bottom: 1px solid var(--hx-background-transparent);
            box-sizing: border-box;
            
            span {
                margin: 0 8px;
                width: 100%;
                // font-size: 16px;
                font-weight: 600;
            }

            span + svg {
                cursor: pointer;
                color: var(--hx-text-secondary);
                transition: .2s;

                &:hover {
                    color: var(--hx-color-red);
                }
            }
        }

        ul {
            height: 100%;
            min-height: 0;
            padding: 12px;
            overflow-x: hidden;

            .alert {
                margin-top: 10%;
                color: var(--hx-text-secondary);
                font-size: 14px;
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
            }

            :deep(.group) {
                transition: .2s;

                &.active {
                    margin: 8px 0;

                    & + .notification {
                        border-top-left-radius: var(--hx-border-radius-left-top);
                        border-top-right-radius: var(--hx-border-radius-rigth-top);
                    }

                    & + :deep(.group) {
                        header {
                            border-top-left-radius: var(--hx-border-radius-left-top);
                            border-top-right-radius: var(--hx-border-radius-right-top);
                        }
                    }
                }

                &:not(.active) header {
                    border-radius: 0;
                }

                &.active header {
                    border-radius: var(--hx-border-radius-left-top) var(--hx-border-radius-rigth-top) 0 0 !important;
                }
            }
        }
    }

    .notification,
    :deep(.group) {
        border-radius: 0;
    
        &:first-child,
        &:first-child header {
            border-top-left-radius: var(--hx-border-radius-left-top) !important;
            border-top-right-radius: var(--hx-border-radius-right-top) !important;
        }
    
        &:last-child,
        &:last-child header {
            border-bottom-left-radius: var(--hx-border-radius-left-bottom) !important;
            border-bottom-right-radius: var(--hx-border-radius-right-bottom) !important;
        }
    
        &:not(:last-child) {
            margin-bottom: 2px;
        }

        &:has(+ .group.active) {
            border-bottom-left-radius: var(--hx-border-radius-left-bottom) !important;
            border-bottom-right-radius: var(--hx-border-radius-right-bottom) !important;
        }
    }

    .new {
        display: flex;
        width: 376px;
        position: fixed;
        right: 2vh;
        bottom: 2vh;
        flex-direction: column;
        transition: .2s;
        z-index: 106;

        &-enter-active,
        &-leave-active {
            transform: translateY(50%);
            opacity: 0;
        }

        .plus {
            margin-bottom: 2px;
            padding: 2px 4px;
            font-size: 10px;
            font-weight: 700;
            align-self: end;
            border-radius: var(--hx-border-radius);
            border: 1px solid var(--hx-background-transparent);
            background-color: #00000055;
            backdrop-filter: blur(10px);
        }

        .hides {
            cursor: pointer;
            margin-top: 4px;
            color: var(--text-secondary);
            font-size: 12px;
            font-weight: 600;
            text-align: right;
            transition: .2s;

            &:hover {
                color: var(--text-primary);
            }
        }
    }
}

</style>