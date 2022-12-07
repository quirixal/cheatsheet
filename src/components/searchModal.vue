<template lang="pug">
#search-modal.flex(v-if="props.active", @click.self="closeSearch")
    .card
        button.close-btn.pointer(@click="closeSearch")
            span.material-symbols-outlined close
        h1.card-title Search though cheat sheet
        input.searchbar(:value="props.searchValue", type="text", name="search", placeholder="Search... (Use `\\` to matches exactly)", @input="search")

        .results(v-if="props.searchValue")
            hr
            ul.result-list(v-if="data.searchResult && data.searchResult.length >=1")
                search-result-item(v-for="result in data.searchResult", :result="result", @update-path="setPathInURL($event)")
            p(v-else) Nothing found
        .recent-search(v-else)
            hr
            ul.recent-search-list(v-if="data.recentSearch && data.recentSearch.length >=1")
                li.recent-search-result.pointer(v-for="result in data.recentSearch", @click="emit('update:searchValue',result)") {{result}}
            p(v-else) Nothing searched yet!
</template>

<script setup>
import { computed, onMounted, onUpdated, reactive, watch } from "vue";
import indexedDocs from "@/assets/json/indexed_docs_directory.json";
import Fuse from "fuse.js";

import searchResultItem from "./searchResultItem.vue";

const props = defineProps(["searchValue", "active"]);
const emit = defineEmits(["update:searchValue", "update:active", "pathUpdated", "closeNavigation"]);
const data = reactive({
    searchValueList: null,
    recentSearch: null,
    searchResult: [],
});

function search($event) {
    emit("update:searchValue", $event.target.value);
    if ($event.target.value.length <= 2) return;

    let fuzzySearchValue = $event.target.value;
    if ($event.target.value.match(/^\\/)) fuzzySearchValue = `="${$event.target.value.substring(1)}"`;

    const options = {
        includeScore: true,
        includeMatches: true,
        findAllMatches: false,
        useExtendedSearch: true,
        shouldSort: true,
        distance: 70,
        keys: ["title", "description", "keywords"],
    };

    var highlighter = function (resultItem) {
        resultItem.item.highlighted = {};
        resultItem.matches.forEach((matchItem) => {
            if (matchItem.key != "keywords") {
                var matchValue = resultItem.item[matchItem.key];
                var result = [];
                var matches = [].concat(matchItem.indices); // limpar referencia
                var pair = matches.shift();

                for (var i = 0; i < matchValue.length; i++) {
                    var char = matchValue.charAt(i);
                    if (pair && i == pair[0]) {
                        result.push('<span class="fuzzy-highlight">');
                    }
                    result.push(char);
                    if (pair && i == pair[1]) {
                        result.push("</span>");
                        pair = matches.shift();
                    }
                }
                resultItem.item.highlighted[matchItem.key] = result.join("");
            } else {
                matchValue = resultItem.item[matchItem.key]; // Array
                result = [];

                matchValue.forEach((value) => {
                    if (value != matchItem.value) {
                        result.push(value);
                        return;
                    }

                    var matches = [].concat(matchItem.indices); // limpar referencia
                    var pair = matches.shift();
                    let keyword = "";
                    for (i = 0; i < value.length; i++) {
                        char = value.charAt(i);
                        if (pair && i == pair[0]) {
                            keyword = '<span class="fuzzy-highlight">';
                        }
                        keyword += char;
                        if (pair && i == pair[1]) {
                            keyword += "</span>";
                            pair = matches.shift();
                        }
                    }
                    result.push(keyword);
                });
                resultItem.item.highlighted.keywords = result;
            }
        });
        return resultItem;
    };

    const fuse = new Fuse(data.searchValueList, options);
    let result = fuse.search(fuzzySearchValue);

    result = result.map((resultItem) => highlighter(resultItem));

    data.searchResult = result.map((el) => el.item);
}

function setPathInURL(path) {
    window.history.replaceState(null, document.title, `?path=${path}`);
    emit("pathUpdated");
    closeSearch();
    emit("closeNavigation");
}

function closeSearch() {
    if (props.searchValue) {
        let recentSearch = JSON.parse(localStorage.getItem("recentSearch"));

        if (!recentSearch) {
            recentSearch = [];
            recentSearch.push(props.searchValue);
        } else {
            if (!recentSearch.includes(props.searchValue)) {
                recentSearch.unshift(props.searchValue);
            }
        }
        localStorage.setItem("recentSearch", JSON.stringify(recentSearch));
    }
    emit("update:searchValue", null);
    emit("update:active", false);
}

onUpdated(() => {
    if (props && props.active) {
        const searchbar = document.querySelector("#search-modal .card .searchbar");
        searchbar.focus();
    }
});

function loadRecentSearch() {
    return JSON.parse(localStorage.getItem("recentSearch"));
}
watch(props, (props) => {
    if (props.active) {
        const loadedRecentSearch = loadRecentSearch();
        if (data.recentSearch != loadedRecentSearch) data.recentSearch = loadedRecentSearch;
    }
});

onMounted(() => {
    data.searchValueList = indexedDocs.map((section) => section.links).flat(1);
});
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
        overflow-y: scroll;

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

        .results,
        .recent-search {
            hr {
                border: none;
                height: 1px;
                background-color: $primary-color;
            }

            .result-list,
            .recent-search-list {
                padding: 0;
                margin: 0;
                list-style-type: none;

                .recent-search-result {
                    border: 2px solid $primary-color;
                    border-radius: 3px;
                    padding: $app-padding;
                    margin: 0 0 $app-padding 0;
                }
            }
        }
    }
}
</style>
