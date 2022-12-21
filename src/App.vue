<template lang="pug">
navigation-drawer(v-model:activeSearch="states.activeSearch", v-model:activeNavigation="states.activeNavigation", @path-updated="renderMarkdownFile()")
search-modal(v-model:active="states.activeSearch", @close-navigation="closeNavigationAndResetSearchValue" @path-updated="renderMarkdownFile()")
main#content(:class="{'no-scroll':states.activeNavigation}")
</template>

<script setup>
import { markdown } from "./markdownit";
import { onMounted, inject, reactive } from "vue";
import { http } from "./axios.js";
import ClipboardJs from "clipboard";

// Components
import navigationDrawer from "./components/navigationDrawer.vue";
import searchModal from "./components/searchModal.vue";
import { trigger } from "@vue/reactivity";

// Defining config & states
const config = inject("config");
const states = reactive({
    activeNavigation: false,
    activeSearch: false,
});

// Render function
async function renderMarkdownFile() {
    const md = markdown;
    const urlQuery = window.location.search.replace("?path=", "");

    const path = urlQuery ? "/" + urlQuery : "/src/docs/index.md";
    const rawReadmeData = (await http.get(path)).data;
    document.querySelector("main#content").innerHTML = addCopyElementToPreElements(md.render(rawReadmeData));

    const clipboard = new ClipboardJs(".clipboard", {
        text: (preIconElement) => {
            return preIconElement.nextElementSibling.innerText;
        },
    });
    clipboard.on("success", (e) => {
        console.log("copy success", e);
        e.trigger.innerText = "check";
        setTimeout(() => {
            e.trigger.innerText = "content_copy";
        }, 1000);
    });

    clipboard.on("error", (e) => {
        console.log("copy error", e);
    });
}

function addCopyElementToPreElements(content) {
    return content.replaceAll(/\<pre\>/g, (value) => {
        return `${value}<span class="clipboard  material-symbols-outlined">content_copy</span>`;
    });
}

function closeNavigationAndResetSearchValue() {
    states.activeNavigation = !states.activeNavigation;
    states.searchValue = null;
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

    &.no-scroll {
        height: calc(100vh - $app-padding * 2);
        overflow: hidden;
    }
}
</style>
