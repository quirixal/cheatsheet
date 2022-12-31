<template lang="pug">
nav.link-section-wrapper
    .link-section(v-for="section in indexedDocs")
        h4.link-section-title {{section.title}}
        ul.link-section-links
            li.link.pointer(v-for="link in section.links", @click="setPathInURL(link.path)") {{link.title}}
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
    height: calc(100vh - $navigation-drawer-subtrahend);
    overflow-y: scroll;
    .link-section {
        .link-section-title {
            margin: 1rem 0 0 0;
        }
        .link-section-links {
            margin: 0;
            overflow: hidden;
            padding-left: 16px;
            list-style-type: none;

            .link {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
