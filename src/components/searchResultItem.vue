<template lang="pug">
li.result-item.pointer.flex.column(@click="$emit('updatePath', result.path)")
    .result-item-header
        p.result-item-title {{result.name}}
    .result-item-content
        p.result-item-description {{result.description}}
        p.result-item-keywords
            .chip(v-for="key in result.keywords") {{key}}
</template>

<script setup>
defineProps(["result"]);
defineEmits(["updatePath"]);
</script>

<style lang="scss" scoped>
.result-item {
    border: 2px solid $primary-color;
    border-radius: 3px;
    padding: $app-padding;
    margin: 0 0 $app-padding 0;
    position: relative;

    .result-item-header {
        .result-item-title {
            margin: 0;
            margin: 0 0 $app-padding 0;
            font-size: 18px;
        }
    }

    .result-item-content {
        .result-item-description {
            margin: 0;
            max-width: 75%;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 14px;
        }
        .result-item-keywords {
            margin: 0;
            max-width: 25%;
            overflow: hidden;
            overflow-x: scroll;
            position: absolute;
            bottom: $app-padding;
            right: $app-padding;
            font-size: 12px;
            display: flex;
            gap: 4px;

            .chip {
                background-color: $primary-color;
                color: $font-color;
                padding: 4px 8px;
                border-radius: 1rem;
                text-align: center;
            }
        }
    }
}
</style>
