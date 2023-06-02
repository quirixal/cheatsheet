import { defineStore } from "pinia";
import indexedDocs from "../assets/json/indexed_docs_directory.json";

export const useMainStore = defineStore("main", {
    state: () => ({
        app: {
            lightTheme: null,
        },
        navigation: {
            state: false,
        },
        search: {
            state: false,
            values: indexedDocs.map((section) => section.links).flat(1),
            recentSearch: JSON.parse(localStorage.getItem("recentSearch")),
        },
    }),
    getters: {
        isLight: (state) => state.app.lightTheme,
        getNavigationState: (state) => state.navigation.state,
        getSearchState: (state) => state.search.state,
        getSearchValues: (state) => state.search.values,
        getSearchRecentSearch: (state) => state.search.recentSearch,
    },
    actions: {
        toggleAppTheme() {
            localStorage.setItem("cheat_sheet_light_mode", !this.app.lightTheme);
            this.app.lightTheme = !this.app.lightTheme;
        },
        loadAppThemeFromLocalStorage() {
            this.app.lightTheme = localStorage.getItem("cheat_sheet_light_mode") == "true" ? true : false;
        },
        openNavigation() {
            this.navigation.state = true;
        },
        closeNavigation() {
            this.navigation.state = false;
        },
        toggleNavigation() {
            this.navigation.state = !this.navigation.state;
        },
        openSearch() {
            this.search.state = true;
        },
        closeSearch() {
            this.search.state = false;
        },
    },
});
