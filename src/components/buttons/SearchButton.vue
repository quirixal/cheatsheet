<script setup lang="ts">
import { useMainStore } from "../../stores";

const store = useMainStore();
</script>

<template lang="pug">
v-btn(@click="store.openSearch()")
    v-icon(start) mdi-magnify
    span.open-search-cmd Press ?
</template>

<style lang="scss">
.open-search-cmd {
  border: 1px solid $cs-site-title-hr-background-color;
  border-radius: 4px;
  padding: 4px;
  font-size: 10px;
}
</style>
