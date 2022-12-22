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
    lightMode: true,
});

// Render function
async function renderMarkdownFile() {
    const md = markdown;
    const urlQuery = window.location.search.replace("?path=", "");

    const path = urlQuery ? "/" + urlQuery : "/src/docs/index.md";
    const rawMarkdownFile = (await http.get(path)).data;
    const preRenderedMarkdownFile = new DOMParser().parseFromString(
        addCopyElementToPreElements(md.render(rawMarkdownFile)),
        "text/html"
    );
    const siteTitle = preRenderedMarkdownFile.querySelector("h1");
    const headlines = preRenderedMarkdownFile.querySelectorAll("h2");
    const subHeadlines = preRenderedMarkdownFile.querySelectorAll("h3");
    const paragraphs = preRenderedMarkdownFile.querySelectorAll("p");
    const lists = preRenderedMarkdownFile.querySelectorAll("ul");
    const codeBlocks = preRenderedMarkdownFile.querySelectorAll("pre");
    const links = preRenderedMarkdownFile.querySelectorAll("a");

    if (siteTitle) {
        siteTitle.id = "site-title";
    }
    if (headlines) {
        headlines.forEach((headline) => {
            headline.classList.add("headline");
        });
    }
    if (subHeadlines) {
        subHeadlines.forEach((subHeadline) => {
            subHeadline.classList.add("sub-headline");
        });
    }
    if (paragraphs) {
        paragraphs.forEach((paragraph) => {
            paragraph.classList.add("paragraph");
            paragraph.querySelectorAll("code").forEach((code) => {
                code.classList.add("inline-code");
            });
        });
    }
    if (lists) {
        lists.forEach((list) => {
            list.classList.add("list");
            list.querySelectorAll("li").forEach((li) => {
                li.classList.add("list-item");
            });
        });
    }
    if (codeBlocks) {
        codeBlocks.forEach((codeBlock) => {
            codeBlock.classList.add("code-block");
        });
    }
    if (links) {
        links.forEach((link) => {
            link.classList.add("link");
        });
    }

    document.querySelector("main#content").innerHTML = preRenderedMarkdownFile.querySelector("body").innerHTML;

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

function toggleTheme(init = false) {
    if (!init) {
        states.lightMode = !states.lightMode;
    }
    if (states.lightMode) {
        document.getElementById("app").classList.remove("dark");
        document.getElementById("app").classList.add("light");
    } else {
        document.getElementById("app").classList.add("dark");
        document.getElementById("app").classList.remove("light");
    }
}

onMounted(() => {
    document.addEventListener("DOMContentLoaded", () => {
        renderMarkdownFile();
        toggleTheme(true);
    });
});
</script>

<style lang="scss" scoped>
#content {
    max-width: 900px;
    min-height: 100vh;
    margin: 0 auto;
    padding: $app-padding;
    padding-left: $navigation-drawer-width-inactive + $app-padding;

    &.no-scroll {
        height: calc(100vh - $app-padding * 2);
        overflow: hidden;
    }
}
</style>
