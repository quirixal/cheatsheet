<template lang="pug">
#navigation-drawer(:class="{'active':props.activeNavigation}", @click.self="closeNavigation")
    .content-wrapper.flex
        p.inactive-msg.pointer(v-if="!props.activeNavigation", @click="emit('update:activeNavigation', true)") Click to open navigation bar

        .inner-wrapper.flex.column(v-show="props.activeNavigation")
            h2.nav-title.pointer(@click="resetURLState") Cheat sheet
            primary-button(label="Open search", icon-left="search", @click="emit('update:activeSearch', true)")
            navigation-list(@path-updated="emitPath")
            .flex-filler
            primary-button(label="Collapse navigation", icon-left="keyboard_double_arrow_left", icon-right="keyboard_double_arrow_left", @click="closeNavigation")
</template>

<script setup>
// Components
import navigationList from "./navigationList.vue";
import primaryButton from "./core/buttons/primaryButton.vue";

// Defining props & emits
const props = defineProps(["activeNavigation", "activeSearch"]);
const emit = defineEmits(["pathUpdated", "update:activeNavigation", "update:activeSearch"]);

// Functions
function closeNavigation() {
    emit("update:activeNavigation", false);
}
function resetURLState() {
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

                .open-search-button {
                    padding: $app-padding;

                    border: $collapse-btn-border solid $collapse-btn-border-color;
                    border-radius: $collapse-btn-border-radius;

                    background-color: $collapse-btn-background-color;
                    color: $font-color;

                    font-size: 16px;

                    justify-content: space-around;
                    align-items: center;
                }
            }
        }
    }
}
</style>
