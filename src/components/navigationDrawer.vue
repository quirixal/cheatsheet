<template lang="pug">
#navigation-drawer(:class="{'active':props.modelValue && props.modelValue.activeNavigation}", @click.self="closeNavigation")
    .content-wrapper.flex
        p.inactive-msg.pointer(v-if="!modelValue.activeNavigation", @click="openNavigation") Click to open navigation bar

        .inner-wrapper.flex.column(v-show="modelValue.activeNavigation")
            h2.nav-title.pointer(@click="setPathInURL") Cheat sheet

            searchbar-input(v-model="modelValue.searchValue", @open-search-modal="openSearch")

            navigation-list(@path-updated="emitPath")
            .flex-filler
            collapse-button(@close-navigation="closeNavigation")
</template>

<script setup>
import { computed } from "vue";

// Components
import collapseButton from "./collapseButton.vue";
import navigationList from "./navigationList.vue";
import searchbarInput from "./searchbarInput.vue";

// Defining props & emits
const props = defineProps(["modelValue"]);
const emit = defineEmits(["pathUpdated", "update:modelValue"]);

// Emits
function openNavigation() {
    props.modelValue.activeNavigation = true;
    emit("update:modelValue", props.modelValue);
}
function closeNavigation() {
    props.modelValue.activeNavigation = false;
    emit("update:modelValue", props.modelValue);
}
function openSearch() {
    props.modelValue.activeSearch = true;
    emit("update:modelValue", props.modelValue);
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
            font-weight: 1000;
            letter-spacing: 4px;
            word-spacing: 6px;
            font-size: 2rem;
            transform-origin: center;
            transform: rotate(-90deg);
            min-width: max-content;
            margin: auto 0;
            background: linear-gradient(to right, #ffffffbe 0%, white 5%, #ffffffbe 15%);
            background-position: 0;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 4s infinite linear;
            animation-fill-mode: forwards;
        }

        @keyframes shine {
            0% {
                background-position: 0;
            }
            100% {
                background-position: 100vh;
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
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
