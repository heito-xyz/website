<template>
    <div class="repository-card">
        <header>
            <Image :src="repository.owner.avatar_url" alt="Owner Avatar"/>

            <div class="name">
                <a :href="repository.owner.html_url" target="_blank">{{ repository.owner.login }}</a>
                <span>/</span>
                <a :href="repository.html_url" target="_blank" :title="repository.name">{{ repository.name }}</a>
            </div>

            <div style="margin-left: auto;"></div>

            <Tooltip v-if="homepage">
                <template #trigger>
                    <a class="badge" :href="repository.homepage!" target="_blank">
                        <Link :size="16"/>
                    </a>
                </template>

                <template #default>
                    <span>Link: <b>{{ homepage }}</b></span>
                </template>
            </Tooltip>

            <Tooltip v-if="repository.stargazers_count > 0">
                <template #trigger>
                    <div class="badge">
                        <Star :size="16"/>
                    </div>
                </template>

                <template #default>
                    <span>Stars: <b>{{ repository.stargazers_count }}</b></span>
                </template>
            </Tooltip>

            <Tooltip v-if="repository.watchers_count > 0">
                <template #trigger>
                    <div class="badge">
                        <Eye :size="16"/>
                    </div>
                </template>

                <template #default>
                    <span>Watchs: <b>{{ repository.watchers_count }}</b></span>
                </template>
            </Tooltip>

            <Tooltip v-if="repository.forks_count > 0">
                <template #trigger>
                    <div class="badge">
                        <GitBranch :size="16"/>
                    </div>
                </template>

                <template #default>
                    <span>Forks: <b>{{ repository.forks_count }}</b></span>
                </template>
            </Tooltip>

            <Tooltip v-if="languageIcon">
                <template #trigger>
                    <div class="language-icon">
                        <Image :src="`https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${languageIcon}.svg`"/>
                    </div>
                </template>

                <template #default>
                    <span>{{ repository.language }}</span>
                </template>
            </Tooltip>
        </header>

        <p v-if="repository.description">
            {{ repository.description }}
        </p>

        <div style="margin-top: auto;"></div>

        <ul class="topics" v-if="repository.topics.length > 0">
            <li v-for="(topic, idx) of repository.topics" :key="idx">
                <span>{{ topic }}</span>
            </li>
        </ul>
        
        <div class="date">
            {{ $t('created') }}: {{ $time.timeago(repository.created_at) }}, {{ $t('updated').toLocaleLowerCase() }}: {{ $time.timeago(repository.updated_at) }}
        </div>
    </div>
</template>

<script lang="ts" setup>

// * Icons
import { Star, Eye, Link, GitBranch } from 'lucide-vue-next';

// * Types
import { type Repository, replaceLanguageName } from '~~/types/api/repository';


// * Composables
const $time = useTime();


const props = defineProps<{
    repository: Repository;
}>();


const languageIcon = computed(() => {
    const lang = props.repository.language?.toLocaleLowerCase();

    if (!lang) return null;

    return replaceLanguageName[lang] || lang;
});

const homepage = computed(() => {
    const link = props.repository.homepage;

    if (!link) return null;

    const url = new URL(link);

    return url.hostname;
});

</script>

<style lang="scss" scoped>

.repository-card {
    display: flex;
    padding: 12px;
    width: 100%;
    min-height: 196px;
    position: relative;
    border-radius: var(--hx-border-radius);
    border: 1px dashed var(--hx-background-transparent);
    flex-direction: column;
    box-sizing: border-box;
    transition: .2s;
    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        & > :deep(.ui-image) {
            margin-right: 8px;
            width: 24px;
            height: 24px;
            border-radius: var(--hx-border-radius);
        }

        .name {
            margin-right: 8px;
            max-width: 100%;
            font-size: 14px;
            font-weight: 600;
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            span {
                margin: 0 4px;
            }

            a {
                cursor: pointer;
                transition: .2s;
                opacity: .7;

                &:hover {
                    text-decoration: underline;
                    opacity: 1;
                }
            }
        }

        :deep(.badge) {
            display: flex;
            width: 16px;
            height: 16px;
            align-items: center;
            justify-content: center;

            & + .badge {
                margin-left: 4px;
            }
        }

        :deep(.language-icon) {
            margin-left: 2px;
            transform: translateY(2px);

            .ui-image {
                width: 20px;
                height: 20px;
            }
        }
    }

    p {
        display: -webkit-box;
        margin: 8px 0;
        font-size: 14px;
        line-clamp: 2;
        text-overflow: ellipsis;
        mix-blend-mode: difference;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        opacity: .7;
    }

    ul.topics {
        display: flex;
        width: 100%;
        align-items: center;
        list-style-type: none;
        mask-image: linear-gradient(90deg, #000 95%, transparent 100%);

        li {
            padding: 2px 4px;
            font-size: 12px;
            white-space: nowrap;
            border-radius: var(--hx-border-radius);
            border: 1px dashed var(--hx-background-transparent);
            background-color: var(--hx-background-secondary);

            &:not(:last-child) {
                margin-right: 8px;
            }
        }
    }

    .date {
        margin-top: 8px;
        font-size: 12px;
        opacity: .7;
    }
}

</style>