<template lang="pug">
nav.link-section-wrapper
    .link-section(v-for="section in states.navigation")
        h4.link-section-title {{section.title}}
        ul.link-section-links
            li.link.pointer(v-for="link in section.links", @click="setPathInURL(link.path)") {{link.label}}
</template>

<script setup>
import { onMounted, reactive, inject } from "vue";
import axios from "../axios.js";

const emit = defineEmits(["pathUpdated"]);
const config = inject("config");
let states = reactive({
    navigation: null,
});

async function getAndRenderDocsLinks() {
    states.navigation = [];
    const branch = config.development ? config.branch : "production";

    const directories = (await axios.get(`/cheatsheet/contents/src/docs?ref=${branch}`)).data;
    for (const directory of directories) {
        let links = {
            title: null,
            links: [],
        };
        links.title = formatTitle(directory.name);

        const innerDirectory = (await axios.get(`/cheatsheet/contents/${directory.path}?ref=${branch}`)).data;
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

function setPathInURL(path) {
    window.history.replaceState(null, document.title, `?path=${path}`);
    emit("pathUpdated");
}

onMounted(async () => {
    await getAndRenderDocsLinks();
});
</script>

<style lang="scss" scoped>
.link-section-wrapper {
    .link-section {
        color: $font-color;
        .link-section-title {
            margin: 0;
        }
        .link-section-links {
            padding-left: 16px;
            list-style-type: none;
        }
    }
}
</style>
