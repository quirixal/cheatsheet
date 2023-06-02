<script setup>
const props = defineProps(["icon", "tooltip"]);
</script>

<template lang="pug">
button.circle-icon-button.flex.pointer(:title="props.tooltip")
    span.material-symbols-outlined {{ props.icon }}
</template>

<style lang="scss" scoped>
button.circle-icon-button {
    min-width: 40px;
    aspect-ratio: 1/1;

    background-color: #00000000;
    color: inherit;
    border: none;
    border-radius: 2rem;

    span.material-symbols-outlined {
        margin: auto;
        font-size: 2rem;
    }
}
</style>
