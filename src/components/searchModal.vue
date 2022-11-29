<template lang="pug">
#search-modal.flex(v-if="props.active", @click.self="emit('update:active', false)")
    .card
        button.close-btn.pointer(@click="emit('update:active', false)")
            span.material-symbols-outlined close
        h1.card-title Search though cheat sheet
        input.searchbar(:value="props.searchValue", type="text", name="search", placeholder="Search...", @input="emit('update:searchValue', $event.target.value)", autofocus)

        .results(v-if="props.searchValue")
            hr
            ul.result-list(v-if="search && search.length >=1")
                search-result-item(v-for="result in search", :result="result", @update-path="setPathInURL($event)")
            p(v-else) Nothing found
</template>

<script setup>
import { computed } from "vue";
import indexedDocs from "@/assets/json/indexed_docs_directory.json";

import searchResultItem from "@/components/SearchResultItem.vue";

const props = defineProps(["searchValue", "active"]);
const emit = defineEmits(["update:searchValue", "update:active", "pathUpdated", "closeNavigation"]);

const search = computed(() => {
    let base = [];
    indexedDocs.forEach((section) => {
        base.push(...section.links);
    });

    if (props.searchValue) {
        return base.filter((file) => {
            const filename = file.name.toLowerCase();
            const fileDescription = file.description.toLowerCase();
            const fileKeywords = [...file.keywords];
            const searchValue = props.searchValue.toLowerCase();

            const keywordsIncludesSearchValue =
                fileKeywords.filter((keyword) => keyword.includes(searchValue)).length >= 1;
            return (
                filename.includes(searchValue) || fileDescription.includes(searchValue) || keywordsIncludesSearchValue
            );
        });
    }
    return null;
});

function setPathInURL(path) {
    window.history.replaceState(null, document.title, `?path=${path}`);
    emit("pathUpdated");
    emit("update:active", false);
    emit("closeNavigation");
}
</script>

<style lang="scss" scoped>
#search-modal {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $navigation-drawer-background-color;

    .card {
        position: relative;
        margin: auto;
        padding: $app-padding;
        background-color: #ffffff;
        width: 600px;
        height: 600px;
        border-radius: 10px;
        box-shadow: 2px 2px 15px #ffffff80;

        .close-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            padding: 0;
            background-color: transparent;
            border: none;

            span.material-symbols-outlined {
                font-size: 30px;
                color: $primary-color;
            }
        }

        .card-title {
            text-align: center;
            margin: 0 0 18px 0;
        }

        .searchbar {
            width: 100%;
            max-width: calc(100% - $app-padding - $app-padding - 4px);
            font-size: 18px;
            padding: $app-padding;
        }

        .results {
            hr {
                border: none;
                height: 1px;
                background-color: $primary-color;
            }

            .result-list {
                padding: 0;
                margin: 0;
                list-style-type: none;
            }
        }
    }
}
</style>
