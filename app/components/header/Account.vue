<template>
    <div :class="['account', { active: isActived }]" ref="root">
        <div class="content">
            <header>
                <div>
                    <div>Guast</div>
                </div>

                <div class="avatar" @click="handleAvatar">
                    <Image src="https://avatars.heito.xyz?square" v-if="readyAvatar"/>
                    <Loader2 :size="16" class="animation-spin" v-else/>
                </div>
            </header>

            <AnimationHeight :showed="isActived">
                <Menu>
                    <MenuButton>
                        <Settings/>

                        <span>{{ $t('settings') }}</span>
                    </MenuButton>

                    <MenuButton @click.stop.prevent="changeTheme">
                        <SunSnow/>

                        <span>{{ $t(darkTheme ? 'darkTheme' : 'lightTheme') }}</span>

                        <Checkbox name="theme" style="gap: 0; margin-left: auto;"
                            :value="darkTheme"
                        />
                    </MenuButton>

                    <MenuChildren>
                        <template #default>
                            <Languages/>

                            <div style="text-align: left;">
                                <div>{{ $t('language') }}</div>
                                <div style="text-align: left; font-size: 12px; opacity: .7;">{{ languages[globalLocale].name }}</div>
                            </div>
                        </template>

                        <template #content>
                            <MenuRadio v-for="({ name, emoji }, code) in languages" :key="code"
                                name="language"
                                :value="code"

                                v-model="globalLocale"

                                @click="setLocale(code)"
                            >
                                <span>{{ emoji }}{{ name }}</span>
                            </MenuRadio>
                        </template>
                    </MenuChildren>
                </Menu>
            </AnimationHeight>
        </div>
    </div>
</template>

<script lang="ts" setup>

// * Icons
import { Languages, Loader2, Settings, SunSnow } from 'lucide-vue-next';

// * Types
import { languages } from '~~/types/locale';


// * Stores
const { locale: globalLocale, setLocale } = useI18n();


const root = ref<HTMLElement | null>(null);


const isActived = ref(false);
const readyAvatar = ref(false);
const darkTheme = ref(import.meta.server ? true : localStorage['theme'] !== 'light');


function handleAvatar() {
    if (isActived.value) return;

    isActived.value = true;

    const close = () => {
        window.addEventListener('click', event => {
            const path = (event as any)?.path || (event.composedPath ? event.composedPath() : undefined);

            if (path && path.includes(root.value)) return close();
            
            isActived.value = false;
        }, { once: true });
    }

    setTimeout(() => close(), 10);
}

function changeTheme() {
    darkTheme.value = !darkTheme.value;

    localStorage.setItem('theme', darkTheme.value ? 'dark' : 'light');
    
    const html = document.querySelector('html');

    if (html) {
        html.className = darkTheme.value ? 'dark' : 'light';
    }
}


onMounted(() => {
    const img = new Image();
    img.src = 'https://avatars.heito.xyz?square';
    
    img.onload = () => {
        readyAvatar.value = true;
    }
});

</script>

<style lang="scss" scoped>

.account {
    width: 32px;
    height: 32px;
    position: relative;
    transition: width .2s;

    &.active {
        width: 196px;
    }
}

.content {
    width: 32px;
    position: absolute;
    top: 0;
    right: 0;
    transition: all .2s;
    border: 1px dashed transparent;
    box-sizing: border-box;

    .active & {
        padding: 8px;
        width: 196px;
        border: 1px dashed var(--hx-background-transparent);
        border-radius: var(--hx-border-radius);
        background-color: #00000055;
        backdrop-filter: blur(5px);

        header {
            margin-bottom: 8px;
            padding: 8px;
            background-color: var(--hx-background-secondary);

            .avatar {
                margin-left: 8px;
                border-radius: 50%;
            }
        }
    }

    header {
        display: flex;
        border-radius: var(--hx-border-radius);
        background-color: transparent;
        align-items: center;
        justify-content: end;
        transition: .2s;

        & > div {
            max-width: calc(100% - 40px);
            text-align: right;
            flex: 1;

            div {
                max-width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            div:nth-child(1) {
                font-size: 14px;
            }

            div:nth-child(2) {
                color: var(--hx-text-secondary);
                font-size: 12px;
                opacity: .7;
            }
        }

        .avatar {
            cursor: pointer;
            display: flex;
            max-width: 32px;
            max-height: 32px;
            min-width: 32px;
            min-height: 32px;
            align-items: center;
            justify-content: center;
            border-radius: var(--hx-border-radius);
            background-color: var(--hx-background-secondary);
            transform: rotateZ(25deg);
            transition: .2s;
            overflow: hidden;

            :deep(.ui-image) {
                width: 100%;
                height: 100%;
                transform: scale(1.5) rotateZ(-25deg);
            }
        }
    }
}

</style>