<template lang="pug">
nav.link-section-wrapper
    .link-section(v-for="section in indexedDocs")
        h4.link-section-title {{section.title}}
        ul.link-section-links
            li.link.pointer(v-for="link in section.links", @click="setPathInURL(link.path)") {{link.label}}
</template>

<script setup>
import indexedDocs from "@/assets/json/indexed_docs_directory.json";

const emit = defineEmits(["pathUpdated"]);

function setPathInURL(path) {
    window.history.replaceState(null, document.title, `?path=${path}`);
    emit("pathUpdated");
}
</script>

<style lang="scss" scoped>
.link-section-wrapper {
    .link-section {
        color: $font-color;
        .link-section-title {
            margin: 0;
        }
        .link-section-links {
            padding-left: 16px;
            list-style-type: none;
        }
    }
}
</style>
