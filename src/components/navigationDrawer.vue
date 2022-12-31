<template lang="pug">
#navigation-drawer(:class="{'active':props.activeNavigation}")
    .top-bar.flex
        h2.nav-title.pointer(@click="resetURLState") Cheat sheet
        .flex-filler 
        button.burger-menu(@click="emit('update:activeNavigation', !props.activeNavigation);")
            span.material-symbols-outlined menu
    .expansion-bar
        .tools.flex
            button.circle-btn.flex.pointer(@click="emit('update:activeSearch', true)")
                span.material-symbols-outlined search
            .flex-filler
            button.circle-btn.pointer.flex(@click="toggleTheme()")
                span.material-symbols-outlined brightness_4
        navigation-list(@path-updated="emitPath")
        .legals.flex
            a(href="?path=src/docs/imprint.md") Imprint
</template>

<script setup>
// Components
import navigationList from "./navigationList.vue";
import primaryButton from "./core/buttons/primaryButton.vue";
import { computed } from "@vue/runtime-core";

// Defining props & emits
const props = defineProps(["activeNavigation", "activeSearch"]);
const emit = defineEmits(["pathUpdated", "update:activeNavigation", "update:appTheme", "update:activeSearch"]);

// Functions
function closeNavigation() {
    emit("update:activeNavigation", false);
}
function resetURLState() {
    window.history.replaceState(null, document.title, "/cheetsheet/");
    closeNavigation();
    emit("pathUpdated");
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

        .burger-menu {
            border: none;
            background: none;
            color: inherit;
            cursor: pointer;

            span {
                font-size: 2rem;
            }
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
            a {
                margin: auto;
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
