<template lang="pug">
navigation-drawer(@render-doc-file="renderMarkdownFile($event)")
main#content
</template>

<script setup>
import navigationDrawer from "./components/navigationDrawer.vue";
import MarkdownIt from "markdown-it";
import { onMounted, inject } from "vue";
import axios from "./axios.js";

const config = inject('config')

async function renderMarkdownFile(path = null) {
    const md = new MarkdownIt();
    const branch = config.development ? config.branch : "production";

    let data;
    if (!path) {
        data = (await axios.get(`/cheatsheet/readme?ref=${branch}`)).data;
    } else {
        data = (await axios.get(`/cheatsheet/contents/${path}?ref=${branch}`)).data;
    }
    document.querySelector("main#content").innerHTML = md.render(atob(data.content));
}

onMounted(() => {
    document.addEventListener('DOMContentLoaded', () => {
        renderMarkdownFile();
    });
});
</script>

<style lang="scss" scoped>
#content {
    padding: $app-padding;
    padding-left: $navigation-drawer-width-inactive + $app-padding;
}
</style>
