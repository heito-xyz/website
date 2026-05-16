<template>
    <main class="repositories">
        <Group class="toolbar">
            <Select style="width: 169px;"
                placeholder="Profile"
                :value="login"

                :options="[
                    {
                        value: 'heitoke'
                    },
                    {
                        label: 'heito.xyz',
                        value: 'heito-xyz'
                    },
                ]"

                @select="$router.push(`/repositories?login=${$event.value}`)"
            />

            <Input style="width: 100%;"
                placeholder="Search repositories"
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
                        value: 'full_name'
                    },
                    {
                        label: 'by Pushed',
                        value: 'pushed'
                    },
                    {
                        label: 'by Updated date',
                        value: 'updated'
                    },
                    {
                        label: 'by Created date',
                        value: 'created'
                    }
                ]"

                @select="sortBy = $event.value; fetctRepositories(login)"
            />
        </Group>

        <Alert style="margin-top: 12px;" v-if="!isLoading && repositories.length < 1">
            <template #picture><Ban/></template>
            <template #title>Список проектов пуст</template>
            <template #default>По данному запросу проекты не найдены.</template>
        </Alert>

        <TransitionGroup tag="div" class="grid" name="project">
            <RepositoryCard v-for="(repository, idx) of listRepositories" :key="idx"
                :repository="repository"
            />
        </TransitionGroup>

        <Alert style="margin-top: 12px;" v-if="isLoading">
            <template #picture><Loader2 class="animation-spin"/></template>
            <template #title>Загрузка репозиториев - <b>{{ login }}</b></template>
            <template #default>Просьба подождать окончания загрузки репозиториев</template>
        </Alert>
    </main>
</template>

<script lang="ts" setup>

// * Components
import RepositoryCard from '~/components/content/repository/Card.vue';

// * Icons
import { Search, ArrowDownAZ, ArrowDownZA, Ban, Plus, Loader2 } from 'lucide-vue-next';

// * Types
import type { Repository } from '~~/types/api/repository';


const $route = useRoute();


const text = ref('');
const order = ref(true);
const sortBy = ref('full_name');
const isLoading = ref(false);
const repositories = ref<Array<Repository>>([]);


const listRepositories = computed(() => {
    const regex = new RegExp(text.value, 'gi');

    return repositories.value.filter(repository => {
        return regex.test(repository.name) || regex.test(repository?.description || '')
    }).sort((a, b) => order.value ? 1 : -1);
});


const login = $route.query?.login ? String($route.query?.login) : 'heitoke';

let timer: number;


function onSearchText(value: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        text.value = value;
    }, 500);
}


async function fetctRepositories(login: string = 'heitoke') {
    isLoading.value = true;

    const page = 1;

    const res = await fetch(`https://api.github.com/users/${login}/repos?page=${page}&per_page=100&sort=${sortBy.value}&direction=${order.value ? 'asc' : 'desc'}`);

    isLoading.value = false;

    if (res.status !== 200) return;

    const list = await res.json();

    repositories.value = list;
}


watch(() => $route.query.login, value => {
    fetctRepositories(String(value))
});


onMounted(() => {
    fetctRepositories(login);
});


useSeoMeta({
    title: 'Home'
});

definePageMeta({
    label: 'repositories',
    index: 3,
    icon: 'GitBranch',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDIgxXadjBKxqLrCfBOZwj2HPEMI8Zfnylg&s',
    description: 'A?',

    header: {
        padding: '0 20%'
    },
    alias: [
        '/repos'
    ]
});

</script>

<style lang="scss" scoped>

.page.repositories {
    .toolbar {
        position: sticky;
        top: 64px;
        left: 0;
        z-index: 1;
    }

    .grid {
        display: grid;
        margin-top: 12px;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
}

</style>