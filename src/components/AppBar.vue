<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link to="/gayguessr" class="no-link">gayguessr</router-link>
    </v-app-bar-title>
    <v-btn icon @click="toggleDarkMode">
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { useTheme } from 'vuetify';

export default {
  name: 'AppBar',
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleDarkMode: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
    }
  },
}
</script>

<style scoped>
.no-link {
  text-decoration: none;
  color: inherit;
}
</style>
