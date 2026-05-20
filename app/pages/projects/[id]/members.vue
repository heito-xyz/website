<template>
    <div class="project-members">
        <Group class="toolbar">
            <Input placeholder="Search members">
                <template #before><Search style="margin-right: 8px;" :size="14"/></template>
            </Input>

            <Button @click="inviteMember">
                <UserRoundPlus/>
                <span>Invite member</span>
            </Button>
        </Group>

        <ul>
            <li v-for="(member, idx) of project.members">
                <Image :src="'https://avatars.heito.xyz?square'"/>

                <div>
                    <div>{{ member.member }}dasdasdlaskj dlaskjdlaskjdlkas jdlaskjdlkasjdlaskjdaslkjdaslkjdaslkjdasdj las</div>
                    <div>Member</div>
                </div>

                <Group style="margin-left: auto;">
                    <Button variant="ghost">
                        <X/>
                    </Button>
                </Group>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

// * Icons
import { Search, UserRoundPlus, X } from 'lucide-vue-next';

// * Types
import type { Project } from '~~/types/api/project';


const props = defineProps<{
    project: Project;
}>();


function inviteMember() {
    props.project.members.push({
        member: String(Math.random()),
        permission: 0,
        updatedAt: new Date().toISOString(),
        joinedAt: new Date().toISOString()
    })
}

</script>

<style lang="scss" scoped>

.project-members {
    .toolbar {
        margin-bottom: 12px;
        position: sticky;
        top: 64px;
        justify-content: start;
        z-index: 2;

        .ui-input {
            width: 100%;
        }

        .ui-button {
            white-space: nowrap;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        list-style-type: none;
        gap: 12px;

        li {
            display: flex;
            padding: 8px;
            border-radius: var(--hx-border-radius);
            border: 1px dashed var(--hx-background-transparent);
            align-items: center;
            gap: 8px;

            :deep(.ui-image) {
                width: 48px;
                height: 48px;
                border-radius: var(--hx-border-radius);
            }

            .ui-image + div {
                max-width: 100%;
                overflow: hidden;
                flex: 1;

                div {
                    max-width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 600;
                }

                div:nth-child(2) {
                    font-size: 10px;
                    opacity: .7;
                }
            }
        }
    }
}

</style>