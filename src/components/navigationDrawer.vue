<template lang="pug">
#navigation-drawer(:class="activeClass")
    .content-wrapper
        p.inactive-msg(v-if="!states.active", @click="openNavigation") Click to open navigation
        .inner-wrapper(v-else)
            h2.nav-title(@click="emitPath(null)") Cheatsheet
            //- input.searchbar(type="text", name="search", placeholder="Search...")
            nav.link-section-wrapper
                .link-section(v-for="section in states.navigation")
                    h4.link-section-title {{section.title}}
                    ul.link-section-links(v-if="states.active")
                        li.link(v-for="link in section.links", @click="emitPath(link.path)") {{link.label}}
            .flex-filler
            button.collapse-btn(@click="closeNavigation") 
                span.material-symbols-outlined keyboard_double_arrow_left
                span Collapse navigation
                span.material-symbols-outlined keyboard_double_arrow_left
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import axios from "../axios.js";

const emit = defineEmits(['renderDocFile'])
let states = reactive({
    active: false,
    navigation: null,
});
const activeClass = computed(() => {
    return states.active ? "active" : "";
});
function openNavigation() {
    if (states.active) return;
    states.active = !states.active;
}
function closeNavigation() {
    states.active = false;
}

async function getAndRenderDocsLinks() {
    states.navigation = [];
    const directories = (await axios.get("https://api.github.com/repos/patrickmaul/cheatsheet/contents/src/docs?ref=production")).data;

    for (const directory of directories) {
        let links = {
            title: null,
            links: [],
        };
        links.title = formatTitle(directory.name);

        const innerDirectory = (
            await axios.get(`https://api.github.com/repos/patrickmaul/cheatsheet/contents/${directory.path}?ref=production`)
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

function emitPath(path) {
    emit("renderDocFile", path);
    states.active = false;
}

onMounted(async () => {
    await getAndRenderDocsLinks();
});
</script>

<style lang="scss" scoped>
#navigation-drawer {
    width: $navigation-drawer-width-inactive;
    height: 100vh;
    position: fixed;
    z-index: 10;

    background: #22222280;

    .content-wrapper {
        width: $navigation-drawer-inner-width-inactive;
        padding: $navigation-drawer-inner-padding;
        border-right: $navigation-drawer-border-width solid $collapse-btn-border-color;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        display: flex;
        justify-content: space-around;

        background-color: $navigation-drawer-background-color;

        p.inactive-msg {
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 4px;
            word-spacing: 6px;
            font-size: 2rem;
            color: #eeeeee;
            transform-origin: center;
            transform: rotate(-90deg);
            min-width: max-content;
            margin: auto 0;
            cursor: pointer;
        }
    }

    // Active Navigation
    &.active {
        width: 100vw;
        max-width: 100vw;
        .content-wrapper {
            width: 256px;
            justify-content: start;
            flex-direction: column;

            .inner-wrapper {
                display: flex;
                flex-direction: column;
                height: 100%;
                .nav-title {
                    margin: 0 0 1rem 0;
                    font-size: 2rem;
                    text-align: center;
                    color: #eeeeee;
                    cursor: pointer;
                }
                .searchbar {
                    border: none;
                    border-radius: 1rem;
                    font-size: 16px;
                    padding: 4px 8px;
                    margin-bottom: 16px;
                }
                .link-section-wrapper {
                    .link-section {
                        .link-section-title {
                            margin: 0;
                            color: #eeeeee;
                        }
                        .link-section-links {
                            color: #eeeeee;
                            padding-left: 16px;
                            list-style-type: none;
                            .link {
                                cursor: pointer;
                            }
                        }
                    }
                }
                .flex-filler {
                    flex: 1;
                }
                button.collapse-btn {
                    padding: $app-padding;
                    min-width: 100%;

                    border: $collapse-btn-border solid $collapse-btn-border-color;
                    border-radius: $collapse-btn-border-radius;

                    background-color: $collapse-btn-background-color;

                    font-size: 16px;

                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
