<template>
  <v-app>
    <AppBar />
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
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
