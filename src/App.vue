<template lang="pug">
navigation-drawer(@path-updated="renderMarkdownFile()", v-model="states")
main#content
</template>

<script setup>
import navigationDrawer from "./components/navigationDrawer.vue";
import { markdown } from "./markdownit";
import { onMounted, inject, reactive } from "vue";
import axios from "./axios.js";

// Components
import navigationDrawer from "./components/navigationDrawer.vue";

// Defining config & states
const config = inject("config");
const states = reactive({
    activeNavigation: true,
    activeSearch: true,
    searchValue: null,
});

// Render function
async function renderMarkdownFile() {
    const md = markdown;
    const branch = config.development ? config.branch : "production";
    const urlQuery = window.location.search.replace("?path=", "");

    let data;
    if (!urlQuery) {
        data = (await axios.get(`/cheatsheet/readme?ref=${branch}`)).data;
    } else {
        data = (await axios.get(`/cheatsheet/contents/${urlQuery}?ref=${branch}`)).data;
    }
    document.querySelector("main#content").innerHTML = md.render(atob(data.content));
}

onMounted(() => {
    document.addEventListener("DOMContentLoaded", () => {
        renderMarkdownFile();
    });
});
</script>

<style lang="scss" scoped>
#content {
    max-width: 900px;
    margin: 0 auto;
    padding: $app-padding;
    padding-left: $navigation-drawer-width-inactive + $app-padding;
}
</style>
