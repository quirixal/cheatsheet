<template lang="pug">
button.primary-button.flex.pointer
    span.material-symbols-outlined {{ iconLeft }}
    span {{ label }}
    span.material-symbols-outlined {{ iconRight }}
</template>

<script setup>
defineProps(["label", "iconLeft", "iconRight"]);
</script>

<style lang="scss" scoped>
button.primary-button {
    padding: $app-padding;

    border: $button-border solid $button-border-color;
    border-radius: $button-border-radius;

    background-color: $button-background-color;
    color: inherit;

    font-size: 16px;

    justify-content: space-around;
    align-items: center;
}
</style>
