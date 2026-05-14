<template>
    <div class="default" :style="styles">
        <slot/>
    </div>
</template>

<script lang="ts" setup>

// * Types
import type { HTMLAttributes } from 'vue';


const squares = ref<Array<[number, number]>>([]);


const styles = computed<HTMLAttributes['style']>(() => {
    return {
        // maskImage: new Array(squares.value.length).fill(`linear-gradient(to bottom, #010101, #010101)`).join(','),
        // maskSize: `${size}px ${size}px`,
        // maskPosition: squares.value.map(([x, y]) => `${x}px ${y}px`).join(','),
        // maskRepeat: 'no-repeat',
        // filter: 'grayscale(.5)'
    }
});


const size = 128;



function randomInt(min: number = 0, max: number = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(async () => {
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
});

</script>

<style lang="scss" scoped>

.default {
    // pointer-events: none;
    // user-select: none;
}

</style>