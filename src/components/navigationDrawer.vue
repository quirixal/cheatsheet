<template lang="pug">
#navigation-drawer(:class="{'active':props.activeNavigation}")
    .top-bar.flex
        h2.nav-title.pointer.text-ellipsis(@click="resetURLState") Cheat sheet
        .flex-filler
        circleIconButton.burger-menu(:icon="'menu'", :tooltip="'Open menu'", icon-size-class="large", @click="emit('update:activeNavigation', !props.activeNavigation);")
    
    .expansion-bar
        .tools.flex
            circleIconButton.search-button(:icon="'search'", :tooltip="'Open Search'", icon-size-class="large", @click="emit('update:activeSearch', true)")
            .flex-filler
            circleIconButton.theme-switch(:icon="'brightness_4'", :tooltip="'Switch theme'", icon-size-class="large",  @click="toggleTheme")
        
        navigation-list(@path-updated="emitPath")
        .legals.flex
            a.text-ellipsis(href="?path=src/docs/imprint.md") Imprint
</template>

<script setup>
// Components
import navigationList from "./navigationList.vue";
import circleIconButton from "./core/buttons/circleIconButton.vue";

// Defining props & emits
const props = defineProps(["activeNavigation", "activeSearch"]);
const emit = defineEmits(["pathUpdated", "update:activeNavigation", "update:appTheme", "update:activeSearch"]);

// Functions
function closeNavigation() {
    emit("update:activeNavigation", false);
}
function resetURLState() {
    window.history.replaceState(null, document.title, "/cheetsheet/");
    emitPath();
}
function emitPath() {
    closeNavigation();
    emit("pathUpdated");
}
function toggleTheme() {
    closeNavigation();
    emit("update:appTheme");
}
</script>

<style lang="scss" scoped>
#navigation-drawer {
    width: 100%;
    max-width: 100vw;

    background: $navigation-drawer-inner-background-color;
    color: $white;

    .top-bar {
        height: $navigation-drawer-width;
        padding: $app-padding;

        align-items: center;

        .nav-title {
            margin: 0;
        }
    }

    .expansion-bar {
        height: 0;
        padding: $app-padding;
        display: none;

        .tools {
            height: $navigation-drawer-tools-height;
            .circle-btn {
                border: none;
                background: none;
                color: inherit;
                height: 46px;
                width: 46px;
                border-radius: 1.5rem;

                span.material-symbols-outlined {
                    margin: auto;
                    font-size: 2rem;
                }
            }
        }

        .legals {
            box-sizing: content-box;
            height: $navigation-drawer-legals-height;
            padding-top: $navigation-drawer-legals-padding-top;

            border-top: $app-border-width solid $white;
            align-content: center;
            a {
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
            height: calc(100vh - $navigation-drawer-width);
            display: block;
        }
    }
}
</style>
