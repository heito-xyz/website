<template>
    <main class="blog" v-if="blog">
        <header :class="{ active: isScrolledDown }">
            <label class="image">
                <Image :src="blog?.image" v-if="blog?.image"/>

                <input type="file" accept="image/*" @change="onInputFileImage">
            </label>

            <div class="details">
                <div class="date">{{ $t('created') }}: {{ $time.timeago(blog.createdAt) }}, {{ $t('updated').toLocaleLowerCase() }}: {{ $time.timeago(blog.updatedAt) }}</div>
                
                <h1 class="title">{{ blog?.title || blog?.name }}</h1>
                
                <div class="scroll-to-down" v-show="!isScrolledDown">Scroll to down</div>
            </div>
        </header>

        <div class="description" v-if="!isEditMode">{{ blog?.description }}</div>
        <Input v-else
            placeholder="Description"
            v-model:value="blog.description"
        />

        <div class="separator">Start</div>

        <div class="content">Content</div>

        <div class="separator">End</div>

        <Group style="justify-content: start;">
            <Button variant="secondary">
                <MessageCircle/>
                <span>Comments</span>
            </Button>

            <Button variant="secondary">
                <ThumbsUp/>
                <span>Likes</span>
            </Button>

            <Button variant="secondary">
                <ThumbsDown/>
                <span>Dislikes</span>
            </Button>
        </Group>

        <h1>Remo</h1>

        <Carousel :items="new Array(12).fill(1)" :step="3" :gap="12" :inset="true">
            <template #item>
                <BlogCard :blog="blog"/>
            </template>
        </Carousel>
    </main>
</template>

<script lang="ts" setup>

// * Components
import BlogCard from '~/components/content/blog/Card.vue';

// * Icons
import { MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-vue-next';

// * Types
import type { Blog } from '~~/types/api/blog';


const $route = useRoute();

// * Stores
const { $notifications } = useNotificationsStore();

// * Composables
const $time = useTime();


const blog = ref<Blog>();
const isEdited = ref(false);
const isScrolledDown = ref(false);


const isNew = $route.params.id === 'new';
const files: Record<string, File> = {};
let blogCache = '';


const isEditMode = computed(() => {
    return isEdited.value || isNew;
});


function onInputFileImage(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files === null || !target.files[0]) return;

    files['image'] = target.files[0];
    blog.value!['image'] = URL.createObjectURL(target.files[0]);
}


function createFixedNotificationProject() {
    const groupName = `blog:${blog.value?.name}`;

    if (!$notifications.groups.has(groupName)) {
        $notifications.groups.create({
            name: groupName,
            description: 'A?',
            label: 'Group - ' + groupName,
            picture: 'icon:Eye'
        });
    }

    if ($notifications.has(groupName + ':update')) return;

    $notifications.add([{
        name: groupName + ':update',
        title: 'Сохранение изменений',
        text: 'У вас имеются не сохраненные изменения',
        group: groupName,
        buttons: [
            {
                label: 'Сохранить'
            },
            {
                label: 'Отменить',
                click() {
                    blog.value = JSON.parse(blogCache);
                }
            }
        ]
    }]);
}


function handleLayoutScroll(event: Event) {
    const target = event.target as HTMLDivElement;

    isScrolledDown.value = target.scrollTop >= (window.innerHeight / 5);
}


onMounted(() => {
    const layout = document.querySelector('.layout') as HTMLDivElement;

    if (layout) layout.addEventListener('scroll', handleLayoutScroll);

    if (isNew) {
        blog.value = {
            name: 'blog',
            title: '',
            description: '',
            image: '',
            tags: [],
            category: '',
            author: 'heito',
            content: {},
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }

        blogCache = JSON.stringify(blog.value);

        // createFixedNotificationProject();
    }
});

onUnmounted(() => {
    const layout = document.querySelector('.layout') as HTMLDivElement;

    if (layout) layout.removeEventListener('scroll', handleLayoutScroll);
});


definePageMeta({
    header: {
        padding: '0 20%'
    },
    alias: [
        '/blog/:id',
        '/b/:id'
    ]
});

</script>

<style lang="scss" scoped>

.page.blog {
    margin-top: -64px;
    // padding: 0 !important;

    header {
        display: flex;
        margin-bottom: 12px;
        padding: 5vh 10vw;
        width: 100vw;
        height: 100vh;
        position: relative;
        left: -20vw;
        align-items: end;
        justify-content: start;
        box-sizing: border-box;
        transition: .2s;

        &.active {
            padding: 0vh 20vw;

            label.image {
                border-radius: var(--hx-border-radius);
                transform: scale(.8);
                filter: grayscale(.5);
            }
        }

        label.image {
            cursor: pointer;
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: var(--hx-background-secondary);
            transition: .2s;
            overflow: hidden;
            z-index: 1;

            :deep(.ui-image) {
                width: 100%;
                height: 100%;
            }

            input {
                cursor: pointer;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
        }

        .details {
            position: relative;
            z-index: 1;

            .date {
                padding: 4px 8px;
                font-size: 10px;
                font-weight: 600;
                border-radius: var(--hx-border-radius);
                background-color: #00000055;
                backdrop-filter: blur(10px);
                mix-blend-mode: difference;
                user-select: none;
            }

            .title {
                color: #fff;
                font-size: 48px;
                font-family: 'Cormorant Garamond', serif;
                mix-blend-mode: difference;
            }

            .scroll-to-down {
                cursor: pointer;
                color: #fff;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                mix-blend-mode: difference;
            }
        }
    }

    .separator {
        display: flex;
        margin: 12px 0;
        color: var(--hx-background-transparent);
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        white-space: nowrap;
        align-items: center;
        user-select: none;

        &::before {
            margin-right: 12px;
        }

        &::after {
            margin-left: 12px;
        }

        &::before, &::after {
            content: " ";
            width: 100%;
            border-top: 1px solid var(--hx-background-transparent);
        }
    }

    h1 {
        font-family: 'Cormorant Garamond', serif;
    }
}

</style>