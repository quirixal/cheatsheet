<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();

function toggleTheme() {
  let newTheme = theme.global.name.value === "dark" ? "light" : "dark";

  localStorage.setItem("cheat_sheet_light_mode", newTheme);
  theme.global.name.value = newTheme;
}
</script>

<template lang="pug">
v-tooltip {{ theme.global.name.value === "dark" ? "Switch to light theme" : "Switch to dark theme" }}
    template(v-slot:activator="{ props }")
        v-btn(icon v-bind="props" @click="toggleTheme")
            v-icon mdi-brightness-4
</template>
