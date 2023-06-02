<script setup>
import indexedDocsDirectory from "@/assets/json/indexed_docs_directory.json"; // Generated file with indexed docs dict

const emit = defineEmits(["pathUpdated"]);

function setPathInURL(path) {
    window.history.replaceState(null, document.title, `?path=${path}`);
    emit("pathUpdated");
}
</script>

<template lang="pug">
nav.link-section-wrapper
    .link-section(v-for="subDirectory in indexedDocsDirectory")
        h4.link-section-title {{subDirectory.title}}
        ul.link-section-links
            li.link.pointer.text-ellipsis(v-for="file in subDirectory.links", @click="setPathInURL(file.path)") {{file.title}}
</template>

<style lang="scss" scoped>
.link-section-wrapper {
    height: calc(100vh - $cs-nd-subtrahend);
    overflow-y: auto;
    .link-section {
        .link-section-title {
            margin: 1rem 0 0 0;
        }
        .link-section-links {
            margin: 0;
            overflow: hidden;
            padding-left: 16px;
            list-style-type: none;
        }
    }
}
</style>
