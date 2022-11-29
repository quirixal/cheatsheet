<template lang="pug">
input.searchbar(:value="modelValue", type="text", name="search", placeholder="Search...", @click="$emit('openSearchModal')", @input="$emit('update:modelValue', $event.target.value)", readonly)
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue", "openSearchModal"]);
</script>

<style lang="scss" scoped>
.searchbar {
    border: none;
    border-radius: 1rem;
    font-size: 16px;
    padding: 4px 8px;
    margin-bottom: 16px;
}
</style>
