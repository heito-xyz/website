<template>
    <div class="project-blogs">
        <Group class="toolbar">
            <Input placeholder="Search blogs">
                <template #before><Search style="margin-right: 8px;" :size="14"/></template>
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
        </Group>

        <TransitionGroup tag="div" class="grid" name="blog">
            <NuxtLink v-for="(blog, idx) of listBlogs" :key="idx">
                <BlogCard :blog="blog"/>
            </NuxtLink>
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>

// * Components
import BlogCard from '~/components/content/blog/Card.vue';

// * Icons
import { Search, ArrowDownAZ, ArrowDownZA } from 'lucide-vue-next';

// * Types
import type { Project } from '~~/types/api/project';
import type { Blog } from '~~/types/api/blog';


const props = defineProps<{
    project: Project;
}>();


const text = ref('');
const order = ref(false);
const sortBy = ref('name');
const blogs = ref<Array<Blog>>(new Array(10).fill(1).map((_, i) => ({
    name: `blog`+i,
    title: Math.random().toString(),
    description: 'dask d;askd;laskd;askd;laasd asdasd asdas dasdas das dasdas d assk d;laskd;laskd;lasdask d;askd;laskd;askd;laasd asdasd asdas dasdas das dasdas d assk d;laskd;laskd;lasdask d;askd;laskd;askd;laasd asdasd asdas dasdas das dasdas d assk d;laskd;laskd;lasdask d;askd;laskd;askd;laasd asdasd asdas dasdas das dasdas d assk d;laskd;laskd;lasdask d;askd;laskd;askd;laasd asdasd asdas dasdas das dasdas d assk d;laskd;laskd;las',
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

</script>

<style lang="scss" scoped>

.project-blogs {
    .toolbar {
        margin-bottom: 12px;
        position: sticky;
        top: 64px;
        justify-content: start;
        z-index: 5;

        .ui-input {
            width: 100%;
        }

        .ui-button {
            white-space: nowrap;
        }
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }
}

</style>