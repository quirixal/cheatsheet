<script setup lang="ts">
// Utils
import { useMainStore } from "../../stores";

const emit = defineEmits(["pathUpdated"]);
const store = useMainStore();

function setPathInURL(path: string) {
  window.history.replaceState(null, document.title, `?path=${path}`);
  emit("pathUpdated");
}
</script>

<template lang="pug">
v-navigation-drawer(expand-on-hover rail permanent)
  v-list(nav)
    v-list-group(v-for="group in store.getDocuments" :key="group.title")
      template(v-slot:activator="{ props }")
        v-list-item(v-bind="props" :prepend-icon="group.icon" :title="group.title")
      v-list-item(v-for="item in group.links" :key="item.title" :title="item.title" @click="setPathInURL(item.path)")
</template>

<style lang="scss">
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>
