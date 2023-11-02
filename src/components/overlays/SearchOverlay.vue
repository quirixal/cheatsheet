<script setup lang="ts">
import { reactive } from "vue";
import Fuse from "fuse.js";
import { useMainStore } from "../../stores";

const emit = defineEmits(["pathUpdated"]);
const store = useMainStore();
const state = reactive({
  searchValue: "",
  searchResult: []
});
const minSearchLength = 3;
const maxRecentSearchValues = 5;

function search($event: any, recentSearchValue: string) {
  let searchValue: string = recentSearchValue || state.searchValue;

  if (searchValue?.length < minSearchLength) {
    state.searchResult = [];
    return;
  }

  let fuzzySearchValue = searchValue;
  if (searchValue.match(/^\\/)) fuzzySearchValue = `="${searchValue.substring(1)}"`;

  const options = {
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    minMatchCharLength: minSearchLength,
    threshold: 0.8,
    useExtendedSearch: true,
    keys: ["title", "description", "keywords"]
  };

  var highlighter = function (resultItem: any) {
    resultItem.item.highlighted = {};
    resultItem.matches.forEach((matchItem: any) => {
      if (matchItem.key != "keywords") {
        var matchValue = resultItem.item[matchItem.key];
        var result: string[] = [];
        var matches = [].concat(matchItem.indices);
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

        matchValue.forEach((value: any) => {
          if (value != matchItem.value) {
            result.push(value);
            return;
          }

          var matches = [].concat(matchItem.indices);
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

  const fuse = new Fuse(store.getSearchValues, options);
  let result = fuse.search(fuzzySearchValue);

  result = result.map((resultItem) => highlighter(resultItem)).map((el) => el.item);
   // @ts-ignore
  state.searchResult = result;
}

function useRecent(recent: string) {
  state.searchValue = recent;
   // @ts-ignore
  search(recent);
}

function setPathInURL(path: string) {
  window.history.replaceState(null, document.title, `?path=${path}`);
  emit("pathUpdated");
  closeSearch();
}

function closeSearch() {
  if (state.searchValue?.length >= minSearchLength) {
    let rs = store.getSearchRecentSearch;

    if (!rs) {
      rs = [];
      rs.push(state.searchValue);
    } else {
      if (!rs.includes(state.searchValue)) {
        if (rs.length === maxRecentSearchValues) {
          rs.pop();
        }
        rs.unshift(state.searchValue);
      }
    }
    localStorage.setItem("recentSearch", JSON.stringify(rs));
  }
   // @ts-ignore
  state.searchValue = null;
  state.searchResult = [];
  store.closeSearch();
}
</script>

<template lang="pug">
v-overlay.d-flex.justify-center.align-center(v-model="store.getSearchState" @click:outside="closeSearch")
  v-card.search-card
    v-card-title Search
    v-card-text
      v-text-field(v-model="state.searchValue" label="Your search" @input="search" autofocus)

      p(v-if="state.searchResult?.length === 0 && state.searchValue?.length >= 3") Nothing Found
      p(v-if="state.searchResult?.length === 0 && store.getSearchRecentSearch") Recent search
      v-list(v-if="state.searchResult?.length === 0 && store.getSearchRecentSearch")
        v-list-item(v-for="item in store.getSearchRecentSearch" :title="item" @click="useRecent(item)")
      v-list(v-else lines="three")
        v-list-item(v-for="item in state.searchResult" :title="item.title" :subtitle="item.description" @click="setPathInURL(item.path)")

</template>

<style lang="scss">
.search-card {
  max-width: 600px;
  width: 100vw;
}
</style>
