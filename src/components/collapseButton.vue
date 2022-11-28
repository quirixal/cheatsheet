<template lang="pug">
button.collapse-btn.flex.pointer(@click="emit('closeNavigation')") 
    span.material-symbols-outlined keyboard_double_arrow_left
    span Collapse navigation
    span.material-symbols-outlined keyboard_double_arrow_left
</template>

<script setup>
const emit = defineEmits(["closeNavigation"]);
</script>

<style lang="scss" scoped>
button.collapse-btn {
    padding: $app-padding;
    min-width: 100%;

    border: $collapse-btn-border solid $collapse-btn-border-color;
    border-radius: $collapse-btn-border-radius;

    background-color: $collapse-btn-background-color;
    color: $font-color;

    font-size: 16px;

    justify-content: space-around;
    align-items: center;
}
</style>
