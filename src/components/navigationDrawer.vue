<template lang="pug">
#navigation-drawer(:class="activeClass", @click.self="closeNavigation")
    .content-wrapper.flex
        p.inactive-msg.pointer(v-if="!states.active", @click="openNavigation") Click to open navigation bar
        .inner-wrapper.flex.column(v-show="states.active")
            h2.nav-title.pointer(@click="setPathInURL") Cheatsheet
            //- input.searchbar(type="text", name="search", placeholder="Search...")
            navigation-list(@path-updated="emitPath")
            .flex-filler
            collapse-button(@close-navigation="closeNavigation")
</template>

<script setup>
import { computed, reactive } from "vue";
import collapseButton from "./collapseButton.vue";
import navigationList from "./navigationList.vue";

const emit = defineEmits(["pathUpdated"]);
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

function setPathInURL() {
    window.history.replaceState(null, document.title, "/");
    closeNavigation();
    emit("pathUpdated");
}

function emitPath() {
    closeNavigation();
    emit("pathUpdated");
}
</script>

<style lang="scss" scoped>
#navigation-drawer {
    width: $navigation-drawer-width-inactive;
    height: 100vh;
    position: fixed;
    z-index: 10;

    background: $navigation-drawer-background-color;

    .content-wrapper {
        width: $navigation-drawer-inner-width-inactive;
        padding: $navigation-drawer-inner-padding;
        border-right: $navigation-drawer-border-width solid $collapse-btn-border-color;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        justify-content: space-around;

        background-color: $navigation-drawer-inner-background-color;

        transition: all 0.3s ease-in-out;

        p.inactive-msg {
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 4px;
            word-spacing: 6px;
            font-size: 2rem;
            transform-origin: center;
            transform: rotate(-90deg);
            min-width: max-content;
            margin: auto 0;
            background: linear-gradient(to right, #ffffffcc 0%, white 5%, #ffffffcc 15%);
            background-position: 0;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 3s infinite linear;
            animation-fill-mode: forwards;
        }

        @keyframes shine {
            0% {
                background-position: 0;
            }
            100% {
                background-position: 635px;
            }
        }
    }

    // Active Navigation
    &.active {
        width: 100vw;
        .content-wrapper {
            width: 256px;
            justify-content: start;
            flex-direction: column;

            .inner-wrapper {
                height: 100%;
                .nav-title {
                    margin: 0 0 1rem 0;
                    font-size: 2rem;
                    text-align: center;
                    color: $font-color;
                }
                .searchbar {
                    border: none;
                    border-radius: 1rem;
                    font-size: 16px;
                    padding: 4px 8px;
                    margin-bottom: 16px;
                }
            }
        }
    }
}
</style>
