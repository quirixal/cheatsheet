<template lang="pug">
navigationDrawer
main#content
</template>

<script setup>
import navigationDrawer from "./components/navigationDrawer.vue";
import MarkdownIt from "markdown-it";
import { onMounted } from "vue";
import axios from "./axios.js";

async function renderReadme() {
    const data = (await axios.get("https://api.github.com/repos/patrickmaul/cheatsheet/readme")).data;

    const md = new MarkdownIt();
    document.querySelector("main#content").innerHTML = md.render(atob(data.content));
}

onMounted(() => {
    document.addEventListener('DOMContentLoaded', () => {
        renderReadme();
    });
});
</script>

<style lang="scss" scoped>
//
</style>
