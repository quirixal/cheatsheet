import { defineStore } from "pinia";

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
            value: null,
        },
    }),
    getters: {
        isLight: (state) => state.app.lightTheme,
        getNavigationState: (state) => state.navigation.state,
        getSearchState: (state) => state.search.state,
        getSearchValue: (state) => state.search.value,
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
