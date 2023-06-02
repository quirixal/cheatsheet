<template lang="pug">
navigation-drawer(v-model:activeSearch="states.activeSearch" @path-updated="renderMarkdownFile()", @update:appTheme="toggleTheme()")
search-modal(v-model:active="states.activeSearch", @path-updated="renderMarkdownFile()")
main(v-show="!store.getNavigationState")
    #loader-wrapper
        .loader
        h1 Load new page, please wait.
    #rendered-markdown-file
</template>

<script setup>
import { markdown } from "./markdownit";
import { onMounted, inject, reactive } from "vue";
import { http } from "./axios.js";
import ClipboardJs from "clipboard";

import { useMainStore } from "./stores";

// Components
import navigationDrawer from "./components/navigationDrawer.vue";
import searchModal from "./components/searchModal.vue";
import { trigger } from "@vue/reactivity";

// Defining config & states
const config = inject("config");
const store = useMainStore();
const states = reactive({
    activeSearch: false,
});

function addFragments(preRenderedMarkdownFile) {
    const headlineLists = [
        preRenderedMarkdownFile.querySelectorAll("h2"),
        preRenderedMarkdownFile.querySelectorAll("h3"),
    ];

    headlineLists.forEach((headlineList) => {
        headlineList.forEach((element) => {
            element.id = element.innerText.toLowerCase().replaceAll(" ", "-");

            let copiedElement = element.cloneNode(true);

            const link = document.createElement("a");
            link.href = `#${element.id}`;
            link.classList.add("fragment-link");
            link.append(copiedElement);

            let filler = document.createElement("div");
            filler.classList.add("flex-filler");
            link.append(filler);

            const fragment = document.createElement("span");
            fragment.classList.add("material-symbols-outlined");
            fragment.innerText = "link";
            link.appendChild(fragment);

            preRenderedMarkdownFile.body.replaceChild(link, element);
        });
    });

    return preRenderedMarkdownFile;
}

function addAttributes(preRenderedMarkdownFile) {
    const elementConfigList = [
        {
            elementTag: "h1",
            class: "site-title",
        },
        {
            elementTag: "h2",
            class: "headline",
        },
        {
            elementTag: "h3",
            class: "sub-headline",
        },
        {
            elementTag: "p",
            class: "paragraph",
            children: [
                {
                    elementTag: "code",
                    class: "inline-code",
                },
            ],
        },
        {
            elementTag: "ul",
            class: "list",
            children: [
                {
                    elementTag: "li",
                    class: "list-item",
                    children: [
                        {
                            elementTag: "code",
                            class: "inline-code",
                        },
                    ],
                },
            ],
        },
        {
            elementTag: "blockquote",
            class: "blockquote",
        },
        {
            elementTag: "pre",
            class: "code-block",
        },
        {
            elementTag: "a",
            class: "link",
        },
    ];

    elementConfigList.forEach((config) => {
        const elements = preRenderedMarkdownFile.querySelectorAll(config.elementTag);
        if (config.elementTag === "h1" && elements.length === 1) {
            elements[0].id = "site-title";
            const siteTitle = elements[0].innerText;
            document.title = siteTitle === "Cheat sheet" ? `${siteTitle} | Home` : `Cheat sheet | ${siteTitle}`;
        } else if (config.elementTag === "h1" && elements.length === 0) {
            document.title = "Cheat sheet | Doc";
        } else {
            elements.forEach((element) => {
                element.classList.add(config.class);

                if (config.children) {
                    config.children.forEach((child) => {
                        const childElements = element.querySelectorAll(child.elementTag);
                        childElements.forEach((childElement) => {
                            childElement.classList.add(child.class);
                        });
                        if (child.children) {
                            child.children.forEach((subChild) => {
                                const childElements = element.querySelectorAll(subChild.elementTag);
                                childElements.forEach((childElement) => {
                                    childElement.classList.add(subChild.class);
                                });
                            });
                        }
                    });
                }
            });
        }
    });
    return preRenderedMarkdownFile;
}

function addLoadingSpinner() {
    document.getElementById("loader-wrapper").style.display = "flex";
}

function removeLoadingSpinner() {
    document.getElementById("loader-wrapper").style.display = "none";
}

// Render function
async function renderMarkdownFile() {
    addLoadingSpinner();

    const md = markdown;
    const urlQuery = window.location.search.replace("?path=", "");

    const path = urlQuery ? "/" + urlQuery : "/src/docs/index.md";
    const rawMarkdownFile = (await http.get(path)).data;
    let preRenderedMarkdownFile = new DOMParser().parseFromString(
        addCopyElementToPreElements(md.render(rawMarkdownFile)),
        "text/html"
    );
    preRenderedMarkdownFile = addAttributes(preRenderedMarkdownFile);
    preRenderedMarkdownFile = addFragments(preRenderedMarkdownFile);

    document.querySelector("main #rendered-markdown-file").innerHTML =
        preRenderedMarkdownFile.querySelector("body").innerHTML;

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
    removeLoadingSpinner();
}

function addCopyElementToPreElements(content) {
    return content.replaceAll(/\<pre\>/g, (value) => {
        return `${value}<span class="clipboard  material-symbols-outlined">content_copy</span>`;
    });
}

function toggleTheme() {
    if (store.getNavigationState) store.closeNavigation();

    store.toggleAppTheme();
    if (store.isLight) {
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
        store.loadAppThemeFromLocalStorage();

        if (store.isLight) {
            document.getElementById("app").classList.remove("dark");
            document.getElementById("app").classList.add("light");
        } else {
            document.getElementById("app").classList.add("dark");
            document.getElementById("app").classList.remove("light");
        }
    });
});
</script>

<style lang="scss" scoped>
#rendered-markdown-file {
    max-width: $cs-rmf-max-width;
    padding: $cs-rmf-padding;
    margin: auto;
}

#loader-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2b2b2b80;
    height: calc(100vh - 56px);

    .loader {
        border: 16px solid $cs-white;
        border-radius: 50%;
        border-top: 16px solid $cs-secondary-color;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    h1 {
        color: $cs-white;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
