<template>
    <div class="default" :style="styles">
        <slot/>
    </div>
</template>

<script lang="ts" setup>

// * Types
import type { HTMLAttributes } from 'vue';


const props = defineProps<{
    isActiveSuperMenu: boolean;
}>();


const squares = ref<Array<[number, number]>>([]);


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


const size = 128;



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

</style>