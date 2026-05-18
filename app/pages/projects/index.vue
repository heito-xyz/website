<template>
    <main class="projects">
        <Group class="toolbar">
            <Input style="width: 100%;"
                placeholder="Search projects"
                :value="text"

                @update:value="onSearchText($event)"
            >
                <template #before>
                    <Search :size="12" style="margin-right: 8px;"/>
                </template>
            </Input>

            <Tooltip side="bottom">
                <template #trigger>
                    <Button variant="outline"
                        @click="order = !order"
                    >
                        <ArrowDownAZ v-if="order"/>
                        <ArrowDownZA v-else/>
                    </Button>
                </template>

                <template #default>
                    <span>Сортировать по {{ order ? 'убыванию' : 'возрастанию' }}</span>
                </template>
            </Tooltip>

            <Select style="width: 169px;"
                placeholder="Sort"
                :value="sortBy"

                :options="[
                    {
                        label: 'by Name',
                        value: 'name'
                    },
                    {
                        label: 'by Count members',
                        value: 'count-members'
                    },
                    {
                        label: 'by Date',
                        value: 'createdAt'
                    }
                ]"

                @select="sortBy = $event.value"
            />

            <NuxtLink style="margin-left: auto;"
                to="/project/new"
            >
                <Button>
                    <Plus/>
                    <span style="white-space: nowrap;">Create project</span>
                </Button>
            </NuxtLink>
        </Group>

        <Alert style="margin-top: 12px;" v-if="projects.length < 1">
            <template #picture><Ban/></template>
            <template #title>Список проектов пуст</template>
            <template #default>По данному запросу проекты не найдены.</template>
            <template #action>
                <NuxtLink style="margin-left: auto;"
                    to="/project/new"
                >
                    <Button>
                        <Plus/>
                        <span>Create project</span>
                    </Button>
                </NuxtLink>
            </template>
        </Alert>

        <TransitionGroup tag="div" class="grid" name="project">
            <ProjectCard v-for="(project, idx) of listProjects" :key="idx"
                :project="project"
            />
        </TransitionGroup>
    </main>
</template>

<script lang="ts" setup>

// * Components
import ProjectCard from '~/components/content/project/Card.vue';

// * Icons
import { Search, ArrowDownAZ, ArrowDownZA, Ban, Plus } from 'lucide-vue-next';

// * Types
import type { Project } from '~~/types/api/project';


const text = ref('');
const order = ref(false);
const sortBy = ref('name');
const projects = ref<Array<Project>>([]);


const listProjects = computed(() => {
    const regex = new RegExp(text.value, 'gi');

    return projects.value.filter(project => {
        return regex.test(project.name) || regex.test(project?.displayName || '') || regex.test(project?.description || '')
    }).sort((a, b) => order.value ? 1 : -1);
});


let timer: number;


function onSearchText(value: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        text.value = value;
    }, 500);
}


useSeoMeta({
    title: () => $t('projects')
});

definePageMeta({
    label: 'projects',
    index: 2,
    icon: 'Presentation',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMTRwGgkfm2jFi8HwIwmaZZFTfaxt83SelA&s',
    description: 'ads',
    header: {
        padding: '0 20%'
    }
});

</script>

<style lang="scss" scoped>

.page.projects {
    .toolbar {
        position: sticky;
        top: 64px;
        left: 0;
        z-index: 1;
    }

    .grid {
        display: grid;
        margin-top: 12px;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
}

</style>