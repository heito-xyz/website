<template>
    <div class="layout default" :style="styles">
        <slot/>
    </div>

    <ClientOnly>
        <Transition name="fade">
            <div class="super-menu" v-if="isActiveSuperMenu">
                <div class="close" @click="$emit('closeSuperMenu')">
                    <span>Close</span>
                    <X/>
                </div>
                
                <ul class="links">
                    <NuxtLink v-for="(link, idx) of links" :key="idx"
                        :to="link.path"
                        :class="idx % 2 === 1 ? 'reverse' : ''"
        
                        @click="$emit('closeSuperMenu')"
                        @mouseenter="selectedLinkIndex = idx"
                    >
                        <li>
                            <span>{{ link.label }}</span>
                            <component :is="icons[link.icon || 'X']"/>
                        </li>
                    </NuxtLink>
                </ul>
        
                <div class="content" v-if="selectedLink !== null">
                    <img :src="selectedLink.banner" alt="" :style="`transform: rotate(${2 * (selectedLinkIndex % 2 === 1 ? 1 : -1)}deg);`">
        
                    <h1>{{ selectedLink.label }}</h1>
        
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid unde animi perspiciatis a, provident adipisci qui! Magni, nobis. Error accusamus corporis iusto cumque vitae corrupti voluptatum, quo quis est cum?</p>
                </div>
            </div>
        </Transition>
    </ClientOnly>
</template>

<script lang="ts" setup>

// * Icons
import { X, Bookmark } from 'lucide-vue-next';
import * as icons from 'lucide-vue-next';

// * Types
import type { HTMLAttributes } from 'vue';


const $emit = defineEmits({
    closeSuperMenu() {}
});

const props = defineProps<{
    isActiveSuperMenu: boolean;
}>();


const squares = ref<Array<[number, number]>>([]);
const selectedLinkIndex = ref(-1);


const styles = computed<HTMLAttributes['style']>(() => {
    const length = squares.value.length;

    if (length < 1) return {};

    return {
        maskImage: new Array(length).fill(`linear-gradient(to bottom, #010101, #010101)`).join(','),
        maskSize: `${size}px ${size}px`,
        maskPosition: squares.value.map(([x, y]) => `${x}px ${y}px`).join(','),
        maskRepeat: 'no-repeat',
        filter: 'grayscale(.95)',
        pointerEvents: 'none',
        userSelect: 'none'
    }
});

const selectedLink = computed(() => {
    return links[selectedLinkIndex.value] || null;
});


const size = 128;

const links: Array<{ label: string, path: string, icon: string, banner: string }> = [
    {
        label: 'Home',
        path: '/',
        icon: 'Eclipse',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQWe0hb94065HccI7bFMuFZLpUo7iXN9gxjQ&s'
    },
    {
        label: 'Projects',
        path: '/projects',
        icon: 'Presentation',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMTRwGgkfm2jFi8HwIwmaZZFTfaxt83SelA&s'
    },
    {
        label: 'Repositories',
        path: '/repositories',
        icon: 'GitBranch',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDIgxXadjBKxqLrCfBOZwj2HPEMI8Zfnylg&s'
    },
    {
        label: 'Blogs',
        path: '/blogs',
        icon: 'Images',
        banner: 'https://img.magnific.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        label: 'Music',
        path: '/music',
        icon: 'Music',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9L-TFxYyUeOOlCsMX2pf8nhdhj3Rpq4sUKg&s'
    },
    {
        label: 'Stats',
        path: '/stats/code',
        icon: 'Code',
        banner: 'https://vsthemes.org/uploads/posts/2017-08/1582034162_universe-full-hd-pc_vsthemes_ru-1.webp'
    },
    {
        label: 'Documentations',
        path: '/docs',
        icon: 'FileCodeCorner',
        banner: 'https://avatars.mds.yandex.net/i?id=764fdf4c9e303d3396e49143cb615d8df4fbfec6-6536283-images-thumbs&n=13'
    },
    {
        label: 'Watch',
        path: '/watch',
        icon: 'Film',
        banner: 'https://image.fonwall.ru/o/xx/hd-background-free-wallpaper-factory.jpg?auto=compress&fit=crop&h=282&w=500&domain=img1.fonwall.ru'
    },
    {
        label: 'Games',
        path: '/games',
        icon: 'Gamepad2',
        banner: 'https://img.freepik.com/free-photo/majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai_188544-15662.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        label: 'About',
        path: '/about',
        icon: 'Info',
        banner: 'https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg'
    }
];


function randomInt(min: number = 0, max: number = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function renderEffect() {
    const maxHorizontal = Math.floor(window.innerWidth / size);
    const maxVertical = Math.floor(window.innerHeight / size);
    const length = (maxVertical + maxHorizontal) * 2;

    console.log('size', maxVertical, maxHorizontal, length)

    for (let i = 0; i < length; i++) {
        await new Promise(r => setTimeout(() => r(true)));

        const x = randomInt(0, maxHorizontal) * size;
        const y = randomInt(0, maxVertical) * size;

        const index = squares.value.findIndex(r => r[0] === x && r[1] === y);

        if (index >= 0) {
            i--;
            continue;
        } else {
            squares.value.push([x, y]);
        }
    }
}


watch(() => props.isActiveSuperMenu, async value => {
    if (value === true) renderEffect();
    else {
        for (let i = squares.value.length; i >= 0; i--) {
            await new Promise(r => setTimeout(() => r(true)));
            
            squares.value.splice(i, 1);
        }
    }
});

</script>

<style lang="scss" scoped>

.default {
    transition: filter .2s, mask-image .2s;
    filter: grayscale(0);
}


.super-menu {
    display: flex;
    padding: 5vw;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    align-items: end;
    justify-content: start;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    z-index: 1000;
}

.close {
    cursor: pointer;
    display: flex;
    margin-bottom: 12px;
    align-items: center;
    justify-self: end;
    transition: all .2s;

    &:hover {
        color: var(--hx-color-red) !important;

        span {
            color: var(--hx-color-red);
        }
    }

    span {
        color: var(--hx-text-primary);
        font-size: 32px;
        font-weight: 700;
        font-family: 'Cormorant Garamond', serif;
        text-transform: uppercase;
        transition: .2s;
    }
}

ul.links {
    display: flex;
    margin-bottom: 32px;
    list-style-type: none;
    flex-direction: column;
    background-color: var(--hx-background-primary);

    a {
        padding: 8px 24px;
        position: relative;
        transition: .2s;

        &:active {
            &::after {
                transform: rotateX(80deg);
            }
        }

        &:hover {
            &::after {
                left: 0;
                border-radius: 0;
            }
        }

        &::after {
            content: "";
            width: 150%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 150%;
            border-radius: 50% 0 0 50%;
            background-color: var(--hx-text-primary);
            transition: .3s, transform .15s;
            z-index: 1;
        }

        &.reverse {
            align-self: end;

            li {
                flex-direction: row-reverse;
            }
        }

        li {
            display: flex;
            position: relative;
            align-items: end;
            mix-blend-mode: difference;
            z-index: 2;
            gap: 8px;

            span {
                color: #fff;
                font-size: 64px;
                font-weight: 700;
                font-family: 'Cormorant Garamond', serif;
                text-transform: uppercase;
            }
        }
    }
}

.content {
    width: calc(90vw - 680px);
    position: fixed;
    top: 5vw;
    left: 5vw;
    align-self: start;
    z-index: 2;

    img {
        margin-bottom: 24px;
        width: 100%;
        // height: 215px;
        object-fit: cover;
        object-position: center;
        transform: rotate(2deg);
    }

    h1 {
        font-size: 32px;
        font-weight: 700;
        font-family: 'Cormorant Garamond', serif;
        text-transform: uppercase;
    }

    p {
        font-size: 20px;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 700;
        opacity: .7;
    }
}

</style>