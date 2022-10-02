<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AppBar from './components/AppBar.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',

  components: {
    AppBar, Main,
  },

  data: () => ({
    //
  }),
}
</script>
