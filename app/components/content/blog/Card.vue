<template>
    <div class="blog-card">
        <div class="image">
            <Image :src="blog.image"/>

            <div class="likes">
                <ThumbsUp :size="12"/>
                <span>{{ 0 }}</span>

                <ThumbsDown :size="12"/>
                <span>{{ 0 }}</span>
            </div>

            <div class="date">{{ $time.timeago(blog.createdAt) }}</div>
        </div>

        <div>
            <div>
                <div>{{ blog?.title || blog?.name }}</div>
                <div>{{ blog?.description }}</div>
            </div>

            <Tooltip>
                <template #trigger>
                    <div class="author">
                        <Image :src="'https://avatars.heito.xyz?square'"/>
                    </div>
                </template>

                <template #default>
                    <span>{{ blog.author }}</span>
                </template>
            </Tooltip>
        </div>
    </div>
</template>

<script lang="ts" setup>

// * Icons
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next';

// * Types
import type { Blog } from '~~/types/api/blog';


// * Composables
const $time = useTime();


const props = defineProps<{
    blog: Blog;
}>();

</script>

<style lang="scss" scoped>

.blog-card {
    cursor: pointer;
    padding: 12px;
    max-width: 100%;
    border-radius: var(--hx-border-radius);
    border: 1px dashed var(--hx-background-transparent);
    box-sizing: border-box;
    transition: .2s;
    overflow: hidden;

    &:active {
        transform: scale(.95);
    }

    &:hover {
        border-style: solid;
        box-shadow: 0 0 0 3px var(--hx-background-transparent) inset;

        & > .image :deep(.ui-image) {
            transform: scale(1);
        }
    }

    & > .image {
        width: 100%;
        height: 169px;
        position: relative;
        border-radius: var(--hx-border-radius);
        overflow: hidden;

        :deep(.ui-image) {
            width: 100%;
            height: 100%;
            transform: scale(1.5);
            transition: .2s;
            z-index: 1;
        }

        .likes {
            display: flex;
            padding: 4px 8px;
            position: absolute;
            left: 8px;
            bottom: 8px;
            font-size: 10px;
            align-items: center;
            border-radius: var(--hx-border-radius);
            background-color: #00000055;
            backdrop-filter: blur(5px);
            z-index: 2;
            gap: 4px;
        }

        .date {
            padding: 4px 8px;
            position: absolute;
            right: 8px;
            bottom: 8px;
            font-size: 10px;
            border-radius: var(--hx-border-radius);
            background-color: #00000055;
            backdrop-filter: blur(5px);
            z-index: 2;
        }
    }

    & > .image + div {
        display: flex;
        max-width: 100%;
        margin-top: 12px;
        align-items: center;

        & > div {
            max-width: 100%;
            overflow: hidden;
            flex: 1;

            div {
                max-width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                &:nth-child(1) {
                    font-size: 14px;
                }

                &:nth-child(2) {
                    font-size: 12px;
                    opacity: .75;
                }
            }
        }

        :deep(.author) {
            width: 32px;
            height: 32px;

            .ui-image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}

</style>