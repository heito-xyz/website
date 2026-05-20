<template>
    <main class="project" v-if="project">
        <header>
            <label class="banner">
                <Image :src="project?.banner" v-if="project?.banner"/>

                <input type="file" accept="image/*" @change="onInputFileBanner">
            </label>
        </header>

        <div class="title">
            <label class="image">
                <Image :src="project?.image" v-if="project?.image"/>

                <input type="file" accept="image/*" @change="onInputFileImage">
            </label>

            <div>
                <Group v-if="isEditMode">
                    <Input placeholder="Display name" v-model:value="project.displayName">
                        <template #before><ALargeSmall :size="14" style="margin-right: 8px;"/></template>
                    </Input>
                    <Input placeholder="Name" v-model:value="project.name">
                        <template #before><AtSign :size="14" style="margin-right: 8px;"/></template>
                    </Input>
                </Group>
                <template v-else>
                    <div>{{ project?.displayName || project?.name }}</div>
                    <div>@{{ project?.name }}</div>
                </template>
            </div>

            <div style="margin-left: auto;"></div>

            <Group>
                <Popover>
                    <template #default="{ toggle }">
                        <Button variant="ghost"
                            @click="toggle"
                        >
                            <EllipsisVertical/>
                        </Button>
                    </template>
                    <template #content>
                        <Menu>
                            <MenuButton>
                                <span>asdasdasdasd</span>
                            </MenuButton>
                        </Menu>
                    </template>
                </Popover>
            </Group>
        </div>

        <div class="details">
            <Label>Description</Label>

            <p v-if="!isEditMode && project?.description && project?.description?.length > 0">{{ project?.description }}</p>
            <Input v-else-if="isEditMode"
                placeholder="Description"
                v-model:value="project.description"
            />

            <Label>Tags</Label>

            <Group style="margin-bottom: 4px;" v-if="isEditMode">
                <Input style="width: 100%;" placeholder="Tag name">
                    <template #before><Tag :size="14" style="margin-right: 8px;"/></template>
                </Input>
                <Button variant="outline"
                    @click="addNewTag"
                >
                    <Plus/>
                </Button>
            </Group>

            <ul class="tags">
                <li v-for="(tag, idx) of project?.tags" :key="idx">
                    <span>{{ tag }}</span>
                    <X :size="12" style="cursor: pointer; margin-left: 4px; color: var(--hx-color-red);" v-if="isEditMode"
                        @click="project.tags.splice(idx, 1)"
                    />
                </li>
            </ul>

            <Label>Links</Label>
            <template v-if="project?.links && project?.links?.length > 0">
        
                <p>{{ project?.links }}</p>
            </template>
        </div>

        <div class="content">
            <Group style="margin-bottom: 12px; justify-content: start;" class="toolbar">
                <NuxtLink :to="`/project/${$route.params.id}/members`">
                    <Button :variant="$route.name === 'projects-id-members' ? 'default' : 'secondary'">
                        <span>{{ $t('members') }}</span>
                    </Button>
                </NuxtLink>

                <NuxtLink :to="`/project/${$route.params.id}/blogs`">
                    <Button :variant="$route.name === 'projects-id-blogs' ? 'default' : 'secondary'">
                        <span>{{ $t('blogs') }}</span>
                    </Button>
                </NuxtLink>

                <NuxtLink :to="`/project/${$route.params.id}/repositories`">
                    <Button :variant="$route.name === 'projects-id-repositories' ? 'default' : 'secondary'">
                        <span>{{ $t('repositories') }}</span>
                    </Button>
                </NuxtLink>
            </Group>
            
            <NuxtPage :project="project"/>
        </div>
    </main>
</template>

<script lang="ts" setup>

// * Icons
import { Tag, ALargeSmall, AtSign,  EllipsisVertical, Plus, X } from 'lucide-vue-next';

// * Types
import type { Project } from '~~/types/api/project';


const $route = useRoute();

// * Stores
const { $notifications } = useNotificationsStore();


const project = ref<Project>();
const isEdited = ref(false);


const isNew = $route.params.id === 'new';
const files: Record<string, File> = {};
let projectCache = '';


const isEditMode = computed(() => {
    return isEdited.value || isNew;
});


function onInputFileBanner(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files === null || !target.files[0]) return;

    files['banner'] = target.files[0];
    project.value!['banner'] = URL.createObjectURL(target.files[0]);
}

function onInputFileImage(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files === null || !target.files[0]) return;

    files['image'] = target.files[0];
    project.value!['image'] = URL.createObjectURL(target.files[0]);
}

function addNewTag(event: Event) {
    const target = event.target as HTMLElement;
    const input = target.closest('.ui-group')?.querySelector('.ui-input input') as HTMLInputElement;

    if (!input || !input?.value || input?.value?.trim() === '') return;

    if (project.value!.tags.includes(input.value)) return;

    project.value!.tags.push(input.value);
    input.value = '';
}

function createFixedNotificationProject() {
    const groupName = `project:${project.value?.name}`;

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
                    project.value = JSON.parse(projectCache);
                }
            }
        ]
    }]);
}


onMounted(() => {
    if (isNew) {
        project.value = {
            name: 'project',
            displayName: '',
            description: '',
            color: '#1e1e1e',
            banner: '',
            image: '',
            links: [],
            members: [],
            repos: [],
            tags: [],
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }

        projectCache = JSON.stringify(project.value);

        createFixedNotificationProject();
    }
});


definePageMeta({
    header: {
        padding: '0 20%'
    },
    alias: [
        '/project/:id',
        '/p/:id'
    ]
});

</script>

<style lang="scss" scoped>

.page.project {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 256px;
    grid-template-areas: 'header header'
                         'title title'
                         'content details';

    header {
        width: 100%;
        height: 215px;
        grid-area: header;

        label.banner {
            cursor: pointer;
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            border-radius: var(--hx-border-radius);
            background-color: v-bind('project?.color');
            overflow: hidden;

            :deep(.ui-image) {
                width: 100%;
                height: 100%;
                border-radius: var(--hx-border-radius);
            }

            input {
                cursor: pointer;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: red;
                opacity: 0;
                // display: none;
            }
        }
    }

    .title {
        display: flex;
        margin-bottom: 12px;
        padding: 8px 24px 8px 112px;
        position: relative;
        align-items: center;
        grid-area: title;

        label.image {
            cursor: pointer;
            display: block;
            width: 64px;
            height: 64px;
            position: absolute;
            top: -36px;
            left: 24px;
            border-radius: var(--hx-border-radius);
            border: 8px solid var(--hx-background-primary);
            background-color: var(--hx-background-primary);
            overflow: hidden;

            :deep(.ui-image) {
                width: 100%;
                height: 100%;
                border-radius: var(--hx-border-radius);
            }

            input {
                cursor: pointer;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: red;
                opacity: 0;
                // display: none;
            }
        }
    }

    .details {
        margin-left: 12px;
        padding: 8px;
        border-radius: var(--hx-border-radius);
        background-color: var(--hx-background-secondary);
        box-sizing: border-box;
        grid-area: details;

        .ui-label {
            margin: 8px 0 4px 0;
            font-size: 11px;
            text-transform: uppercase;
            opacity: .5;

            &:first-child {
                margin-top: 0;
            }
        }

        ul.tags {
            display: flex;
            max-width: 100%;
            flex-wrap: wrap;
            list-style-type: none;
            gap: 4px;

            li {
                display: flex;
                max-width: calc(100% - 16px);
                padding: 2px 4px;
                border: 1px dashed var(--hx-background-transparent);
                border-radius: var(--hx-border-radius);
                align-items: center;

                span {
                    max-width: 100%;
                    font-size: 10px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    flex: 1;
                }
            }
        }
    }

    .content {
        grid-area: content;
    }
}

</style>