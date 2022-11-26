<template lang="pug">
navigation-drawer(@render-doc-file="renderMarkdownFile($event)")
main#content
</template>

<script setup>
import navigationDrawer from "./components/navigationDrawer.vue";
import MarkdownIt from "markdown-it";
import { onMounted } from "vue";
import axios from "./axios.js";

async function renderMarkdownFile(path = null) {
    const md = new MarkdownIt();
    let data;
    if (!path) {
        data = (await axios.get("https://api.github.com/repos/patrickmaul/cheatsheet/readme")).data;
    } else {
        data = (await axios.get(`https://api.github.com/repos/patrickmaul/cheatsheet/contents/${path}`)).data;
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
    padding: 8px;
    padding-left: 81px + 8px;
}
</style>
