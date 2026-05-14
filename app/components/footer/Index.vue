<template>
    <footer>
        <div class="border">
            <img src="/favicon.ico" alt="Logo">
        </div>

        <div class="content">
            <div class="info">
                <div class="logo">
                    <img src="/favicon.ico" alt="Logo">

                    <span>heito.xyz</span>
                </div>

                <p v-html="$t('footer.text').replace(/\n/g, '<br>')"></p>

                <Select style="width: 215px;"
                    placeholder="Language"
                    :value="locale"
                    :options="locales.map(locale => ({
                        label: locale?.name,
                        value: locale?.code
                    }))"

                    @select="setLocale($event.value as any)"
                />
            </div>

            <div style="margin-left: auto;"></div>

            <div class="group" v-for="(items, name) in groups" :key="name">
                <h5>{{ $t(name) }}</h5>

                <ul>
                    <NuxtLink v-for="(item, idx) of items" :key="idx"
                        :target="item.path.includes('http') ? '_blank' : '_self'"
                        :to="item.path"
                    >
                        <li>
                            <span>{{ item.label }}</span>
                        </li>
                    </NuxtLink>
                </ul>
            </div>
        </div>

        <div class="border">
            <span style="white-space: nowrap; font-size: 10px;">© {{ new Date().getFullYear() }}, made with ❤️ by heito</span>
        </div>

    </footer>
</template>

<script lang="ts" setup>

// * Uses
const { locale, locales, setLocale } = useI18n();


const groups: Record<string, Array<{
    label: string;
    path: string;
}>> = {
    'ecosystem': [
        {
            label: 'Toru',
            path: 'https://toru.heito.xyz'
        },
        {
            label: 'Status',
            path: 'https://status.heito.xyz'
        }
    ],
    'info': [
        {
            label: 'About',
            path: '/about'
        }
    ]
};

</script>

<style lang="scss" scoped>

footer {
    margin-top: 64px;
    width: 100%;
}

.border {
    display: flex;
    height: 32px;
    align-items: center;
    box-sizing: border-box;

    img,
    span {
        margin: 0 8px;
    }

    &::after, &::before {
        content: " ";
        width: 100%;
        border-bottom: 1px solid var(--hx-background-secondary);
        box-sizing: border-box;
    }
}

.content {
    display: flex;
    padding: 0 32px;

    .info {
        display: flex;
        flex-direction: column;

        .logo {
            display: flex;
            align-items: center;
        }

        p {
            margin: 8px 0;
            font-size: 14px;
            color: var(--hx-text-secondary);
            word-break: break-all;
        }
    }

    .group {
        &:not(:last-child) {
            margin-right: 32px;
        }

        ul, li {
            list-style-type: none;
        }

        h5 {
            margin-bottom: 8px;
            font-style: italic;
            text-align: right;
        }

        a {
            cursor: pointer;
            color: var(--hx-text-primary);
            font-size: 14px;
            text-align: right;
            transition: .2s;
            opacity: .7;

            &:hover {
                text-decoration: underline;
                opacity: 1;
            }

            li {
                margin-top: 4px;
            }
        }
    }
}

</style>