<template lang="pug">
#navigation-drawer(:class="{'active':store.getNavigationState}")
    .top-bar.flex
        //- Menu button
        circleIconButton.burger-menu(:icon="'menu'", :tooltip="'Open menu'", icon-size-class="large", @click="store.toggleNavigation()")

        //- Navigation itle
        h2.nav-title.pointer.text-ellipsis(@click="resetURLState") Cheat sheet
        .flex-filler

        //- Theme switch button
        circleIconButton.theme-switch(:icon="'brightness_4'", :tooltip="'Switch theme'", icon-size-class="large",  @click="emit('update:appTheme')")

        //- Open search button
        circleIconButton.search-button(:icon="'search'", :tooltip="'Open Search'", icon-size-class="large", @click="emit('update:activeSearch', true)")
    
    .expansion-bar
        //- For toolbox uncomment following lines
        //- these file [15f.] $ [74ff.]
        //- _variable.scss [19] & [22]

        //- .tools.flex
        //-     .flex-filler
        
        navigation-list(@path-updated="emitPath")
        .legals.flex
            a.text-ellipsis(href="?path=src/docs/imprint.md") Imprint
</template>

<script setup>
// Components
import navigationList from "./navigationList.vue";
import circleIconButton from "./core/buttons/circleIconButton.vue";
import { useMainStore } from "../stores";

// Defining props & emits
const props = defineProps(["activeSearch"]);
const emit = defineEmits(["pathUpdated", "update:appTheme", "update:activeSearch"]);
const store = useMainStore();

// Functions
function resetURLState() {
    window.history.replaceState(null, document.title, "/cheetsheet/");
    emitPath();
}
function emitPath() {
    store.closeNavigation();
    emit("pathUpdated");
}
</script>

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

    .expansion-bar {
        height: 0;
        padding: $cs-padding;
        display: none;

        // .tools {
        //     height: $cs-nd-tools-height;
        // }

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
        .expansion-bar {
            height: calc(100vh - $cs-nd-height);
            display: block;
        }
    }
}
</style>
