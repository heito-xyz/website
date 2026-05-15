<template>
    <div class="project-card">
        <Image :src="project?.banner" v-if="project?.banner"/>

        <header>
            <div class="title">
                <Image :src="project.image" v-if="project.image"/>

                <span>{{ project?.displayName || project?.name }}</span>
            </div>
            <div class="description">{{ project?.description }}</div>
        </header>

        <div>
            <ul class="members" v-if="project?.members?.length! > 0">
                <Tooltip v-for="({ member }, idx) of project?.members?.slice(0, 5)" :key="idx">
                    <template #trigger>
                        <li>
                            <Image :src="`https://avatars.heito.xyz?square`"/>
                        </li>
                    </template>

                    <template #default>
                        <span>{{ member }}</span>
                    </template>
                </Tooltip>

                <li v-show="project?.members?.length! > 5"
                    style="background-color: var(--hx-background-secondary);"
                >
                    +{{ project?.members?.length! - 5 }}
                </li>
            </ul>

            <div style="margin: 0 0 0 auto;"></div>

            <ul class="tags" v-if="project?.tags?.length! > 0">
                <li v-for="(tag, idx) of project?.tags" :key="idx">{{ tag }}</li>
            </ul>

            <div class="date">26 мая 2026</div>
        </div>
    </div>
</template>

<script lang="ts" setup>

// * Types
import type { Project } from '~~/types/api/project';


const props = defineProps<{
    project: Project;
}>();

</script>

<style lang="scss" scoped>

.project-card {
    cursor: pointer;
    display: flex;
    padding: 16px 24px;
    width: 100%;
    min-height: 196px;
    position: relative;
    border-radius: var(--hx-border-radius);
    border: 1px solid var(--hx-background-transparent);
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    transition: .2s;
    overflow: hidden;

    &:hover {
        & > :deep(.ui-image) {
            transform: scale(1.1);
            filter: blur(5px) grayscale(0);
        }
    }

    & > :deep(.ui-image) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(1.3);
        filter: blur(5px) grayscale(.5);
        transition: .2s;
        z-index: -1;
    }

    header {
        .title {
            display: flex;
            align-items: center;

            :deep(.ui-image) {
                margin-right: 8px;
                width: 24px;
                height: 24px;
                border-radius: var(--hx-border-radius);
            }

            span {
                max-width: 100%;
                font-size: 32px;
                font-weight: 700;
                font-family: 'Cormorant Garamond', serif;
                text-overflow: ellipsis;
                white-space: nowrap;
                mix-blend-mode: difference;
                overflow: hidden;
            }
        }

        .description {
            display: -webkit-box;
            margin: 8px 0 24px 0;
            color: var(--hx-text-secondary);
            line-clamp: 2;
            text-overflow: ellipsis;
            mix-blend-mode: difference;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            opacity: .7;
        }
    }

    header + div {
        display: flex;
        align-items: center;
        gap: 8px;

        ul.members {
            display: flex;
            list-style-type: none;

            &:hover {
                li {
                    opacity: .5;
                    z-index: 1;
                }
            }

            :deep(li) {
                margin: 0 0 0 -6px;
                width: 24px;
                height: 24px;
                position: relative;
                color: var(--text-secondary);
                font-size: 10px;
                font-weight: 700;
                text-align: center;
                line-height: 24px;
                border-radius: 50%;
                transition: all .2s;
                overflow: hidden;

                &:not(:first-child) {
                    mask-image: radial-gradient(ellipse 12px 24px at 3px center, #0000 4px, #000 0);
                    mask-position: 0 0;
                }
                
                &:first-child {
                    margin: 0;
                }
                
                &:hover {
                    mask-image: none;
                    opacity: 1;
                    z-index: 2;
                }

                .ui-image {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
        }

        .date {
            color: var(--text-secondary);
            font-size: 12px;
            white-space: nowrap;
        }

        ul.tags {
            display: flex;
            margin-left: auto;
            align-items: center;
            justify-content: flex-end;
            overflow: hidden;

            li {
                margin: 0 8px 0 0;
                padding: 4px 8px;
                font-size: 12px;
                white-space: nowrap;
                border-radius: 5px;
                background-color: #00000055;
                backdrop-filter: blur(5px);
                transition: .2s;

                &:last-child {
                    margin: 0;
                }
            }
        }
    }
}

</style>