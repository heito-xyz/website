<template>
    <main class="blogs">
        <h1>Latest blogs</h1>

        <Carousel style="margin: 12px 0;" :items="blogs.slice(0, 9)" :step="3" :gap="12" :inset="true">
            <template #item="{ item }">
                <NuxtLink>
                    <BlogCard
                        :blog="item"
                    />
                </NuxtLink>
            </template>
        </Carousel>

        <h1 style="margin-bottom: 12px;">{{ $t('blogs') }}</h1>

        <Group class="toolbar">
            <Input style="width: 100%;"
                placeholder="Search blogs"
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
                        label: 'by Likes',
                        value: 'likes'
                    },
                    {
                        label: 'by Dislikes',
                        value: 'dislikes'
                    },
                    {
                        label: 'by Date',
                        value: 'createdAt'
                    }
                ]"

                @select="sortBy = $event.value"
            />

            <NuxtLink style="margin-left: auto;"
                to="/blog/new"
            >
                <Button>
                    <Plus/>
                    <span style="white-space: nowrap;">Create blog</span>
                </Button>
            </NuxtLink>
        </Group>

        <Alert style="margin-top: 12px;" v-if="blogs.length < 1">
            <template #picture><Ban/></template>
            <template #title>Список блогов пуст</template>
            <template #default>По данному запросу блоги не найдены.</template>
            <template #action>
                <NuxtLink style="margin-left: auto;"
                    to="/blog/new"
                >
                    <Button>
                        <Plus/>
                        <span>Create blog</span>
                    </Button>
                </NuxtLink>
            </template>
        </Alert>

        <TransitionGroup tag="div" class="grid" name="blog">
            <NuxtLink v-for="(blog, idx) of listBlogs" :key="idx">
                <BlogCard
                    :blog="blog"
                />
            </NuxtLink>
        </TransitionGroup>
    </main>
</template>

<script lang="ts" setup>

// * Components
import BlogCard from '~/components/content/blog/Card.vue';

// * Icons
import { Search, ArrowDownAZ, ArrowDownZA, Ban, Plus } from 'lucide-vue-next';

// * Types
import type { Blog } from '~~/types/api/blog';


const text = ref('');
const order = ref(false);
const sortBy = ref('name');
const blogs = ref<Array<Blog>>(new Array(120).fill(1).map((_, i) => ({
    name: `blog`+i,
    title: Math.random().toString(),
    description: 'dask d;',
    image: `https://avatars.heito.xyz?square`,
    category: 'ads',
    tags: [],
    author: 'heito',
    content: {},
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
})));


const listBlogs = computed(() => {
    const regex = new RegExp(text.value, 'gi');

    return blogs.value.filter(blog => {
        return regex.test(blog.name) || regex.test(blog?.description || '')
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
    title: () => $t('blogs')
});

definePageMeta({
    label: 'blogs',
    index: 4,
    icon: 'Images',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqijvoRdOz5qmVk7ty02sOx7drPOfmbNBLpg&s',
    description: 'Blogs',
    header: {
        padding: '0 20%'
    }
});

</script>

<style lang="scss" scoped>

.page.blogs {
    h1 {
        font-family: 'Cormorant Garamond', serif;
    }

    .toolbar {
        position: sticky;
        top: 64px;
        left: 0;
        z-index: 5;
    }

    .grid {
        display: grid;
        margin-top: 12px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
    }
}

</style>