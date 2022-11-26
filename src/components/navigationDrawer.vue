<template lang="pug">
#navigation-drawer(:class="activeClass")
    .inner-wrapper
        span.nav-title Cheatsheet
        input(v-if="states.active", type="text", name="search")
        nav.link-section-wrapper(v-if="states.navigation")
            .link-section(v-for="section in states.navigation")
                h4.link-section-title {{section.title}}
                ul.link-section-links(v-if="states.active")
                    li(v-for="link in section.links") {{link.label}}
        button(@click="toggleNavigation") {{ states.active ? "<<": ">>" }}
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import axios from "../axios.js";

let states = reactive({
    active: true,
    navigation: null,
});
const activeClass = computed(() => {
    return states.active ? "active" : "";
});
function toggleNavigation() {
    states.active = !states.active;
}

async function getAndRenderDocsLinks() {
    states.navigation = [];
    const directories = (await axios.get("https://api.github.com/repos/patrickmaul/cheatsheet/contents/src/docs")).data;

    for (const directory of directories) {
        let links = {
            title: null,
            links: [],
        };
        links.title = formatTitle(directory.name);

        const innerDirectory = (
            await axios.get(`https://api.github.com/repos/patrickmaul/cheatsheet/contents/${directory.path}`)
        ).data;
        for (const file of innerDirectory) {
            let link = {};
            link.label = formatTitle(file.name);
            link.path = file.path;

            links.links.push(link);
        }
        states.navigation.push(links);
    }
}

function formatTitle(title) {
    title = title[0].toUpperCase() + title.substring(1);

    if (title.endsWith(".md")) {
        return title.substring(0, title.length - 3);
    }
    return title;
}

onMounted(async () => {
    await getAndRenderDocsLinks();
});
</script>

<style lang="scss" scoped>
#navigation-drawer {
    position: relative;
    height: 100vh;
    max-height: 100vh;
    width: 80px;
    max-width: 80px;
    .inner-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 64px;
        overflow: hidden;
        border-right: 1px solid black;
        padding: 8px;
        display: flex;
        flex-direction: column;
    }

    &.active {
        width: 100vw;
        max-width: 100vw;
        .inner-wrapper {
            width: 256px;
        }
    }
}
</style>
