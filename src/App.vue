<script setup lang="ts">
import { onMounted, inject } from "vue";
import { useTheme, type ThemeInstance } from "vuetify";
// Utils
import MarkdownRenderer from "./assets/scripts/MarkdownRenderer";
// Components
import ApplicationBar from "./components/bars/ApplicationBar.vue";
import NavigationBar from "./components/bars/NavigationBar.vue";
import SearchOverlay from "./components/overlays/SearchOverlay.vue";

const theme: ThemeInstance = useTheme();
const $http: any = inject("http");

async function renderFromPath() {
  setLoadingSpinner(true, true);
  // Get target element in DOM
  const target: Element | null = document.getElementById("rendered-markdown");

  if (target) {
    target.innerHTML = "";
    // Get path from URL and construct axios request url
    const path: string = window.location.search.replace("?path=", "");
    const requestURL: string = path ? `/${path}` : "/src/docs/index.md";

    // Fetch raw markdown file
    const rawMarkdownFile: string = `${(await $http.get(requestURL)).data}`;

    // Render markdown file
    const md: MarkdownRenderer = new MarkdownRenderer(rawMarkdownFile);
    target.innerHTML = md.render();
  }
  setLoadingSpinner();
}

function setLoadingSpinner(state: boolean = false, newText: boolean = false) {
  if (state || newText) {
    const funnySentences = [
      "Hold on tight, new page coming!",
      "Abracadabra... and here's the new page!",
      "The unicorns are working their magic, just a moment!",
      "Time for the servers to have a coffee break...",
      "Loading time? Not on our watch!",
      "Drumroll, please... Ta-da, the fresh page is here!",
      "Our pixel fairies are busy painting the new page!",
      "Just a quick wait... almost there!",
      "The hamsters are running at top speed... page loading!"
    ];

    const target: Element | null = document.querySelector("#loading-spinner-wrapper h1");
    if (target)
      (target as HTMLElement).innerText =
        funnySentences[Math.floor(Math.random() * funnySentences.length)];
  }

  const target: Element | null = document.getElementById("loading-spinner-wrapper");
  if (target) (target as HTMLElement).style.display = state ? "flex" : "none";
}

onMounted(() => {
  const storedTheme: string | null = localStorage.getItem("cheat_sheet_light_mode");
  theme.global.name.value = storedTheme ? storedTheme : "dark";
  renderFromPath();
});
</script>

<template lang="pug">
v-app
  //- Loading spinner
  #loading-spinner-wrapper
      .loading-spinner
      h1
  //- Overlays
  SearchOverlay(@path-updated="renderFromPath")
  //- Main Content
  ApplicationBar(@path-updated="renderFromPath")
  NavigationBar(@path-updated="renderFromPath")
  v-main
    v-container
      #rendered-markdown
</template>

<style lang="scss" scoped>
#loading-spinner-wrapper {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2b2b2b80;
  height: calc(100vh - 56px);

  .loading-spinner {
    border: 16px solid #ffffff;
    border-radius: 50%;
    border-top: 16px solid #ff0000;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  h1 {
    color: #ffffff;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
