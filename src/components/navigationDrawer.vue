<template lang="pug">
#navigation-drawer(:class="activeClass")
    .content-wrapper.flex
        p.inactive-msg(v-if="!states.active", @click="openNavigation") Click to open navigation bar
        .inner-wrapper.flex.column(v-else)
            h2.nav-title(@click="setPathInURL") Cheatsheet
            //- input.searchbar(type="text", name="search", placeholder="Search...")
            navigation-list(@path-updated="emit('pathUpdated')")
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

        p.inactive-msg {
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 4px;
            word-spacing: 6px;
            font-size: 2rem;
            color: $font-color;
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
                    cursor: pointer;
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
