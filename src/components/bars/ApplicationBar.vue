<script setup lang="ts">
import { onMounted } from "vue";
import ThemeSwitchButton from "../buttons/ThemeSwitchButton.vue";
import SearchButton from "../buttons/SearchButton.vue";
// Utils
import { useMainStore } from "../../stores";

const emit = defineEmits(["pathUpdated", "update:appTheme"]);
const store = useMainStore();

function resetURLState() {
  window.history.replaceState(null, document.title, "/cheatsheet/");
  emit("pathUpdated");
}

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.isTrusted && event.key == "?") {
      if (!store.getSearchState) store.openSearch();
    }
  });
});
</script>

<template lang="pug">
v-app-bar.app-bar(flat)
  v-app-bar-title.pointer.app-title(@click="resetURLState()") Cheat-Sheet
  search-button.ml-4

  v-spacer
  
  .action-buttons.me-4
    theme-switch-button
</template>

<style lang="scss">
.app-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

  .app-title {
    flex: 0 !important;
    min-width: max-content !important;
  }
}
</style>
