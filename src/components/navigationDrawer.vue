<script setup>
import { useMainStore } from "../stores";
import navigationList from "./navigationList.vue";
import circleIconButton from "./core/buttons/circleIconButton.vue";

const emit = defineEmits(["pathUpdated", "update:appTheme"]);
const store = useMainStore();

function resetURLState() {
    window.history.replaceState(null, document.title, "/cheetsheet/");
    emitPath();
}
function emitPath() {
    store.closeNavigation();
    emit("pathUpdated");
}
</script>

<template lang="pug">
#navigation-drawer(:class="{'active':store.getNavigationState}")
    .top-bar.flex
        //- Menu button
        circleIconButton.burger-menu(:icon="'menu'", :tooltip="'Open menu'", @click="store.toggleNavigation()")

        //- Navigation itle
        h2.nav-title.pointer.text-ellipsis(@click="resetURLState") Cheat sheet
        .flex-filler

        //- Theme switch button
        circleIconButton.theme-switch(:icon="'brightness_4'", :tooltip="'Switch theme'",  @click="emit('update:appTheme')")

        //- Open search button
        circleIconButton.search-button(:icon="'search'", :tooltip="'Open Search'", @click="store.openSearch()")
    
    .navigation
        navigation-list(@path-updated="emitPath")
        .legals.flex
            a.text-ellipsis(href="?path=src/docs/imprint.md") Imprint
</template>

<style lang="scss" scoped>
#navigation-drawer {
    width: 100%;
    max-width: 100vw;

    background: $cs-nd-inner-background-color;
    color: $cs-white;

    .top-bar {
        height: $cs-nd-height;
        padding: $cs-padding;

        align-items: center;

        .nav-title {
            margin: 0 0 0 1rem;
        }
    }

    .navigation {
        height: 0;
        padding: $cs-padding;
        display: none;

        .legals {
            box-sizing: content-box;
            height: $cs-nd-legals-height;
            padding-top: $cs-nd-legals-padding-top;

            border-top: $cs-border-width solid $cs-white;
            align-content: center;
            a {
                margin: auto 0;
                width: 100%;
                height: max-content;
                text-align: center;
                color: inherit;
                text-decoration: none;
            }
        }
    }

    // Active Navigation
    &.active {
        .navigation {
            height: calc(100vh - $cs-nd-height);
            display: block;
        }
    }
}
</style>
