<template>
  <v-container>
    <h1>gayguessr</h1>
    <Game />
  </v-container>
</template>

<script lang="ts">
import Game from "./Game.vue";

export default {
  name: 'HelloWorld',
  components: { Game },
  data: () => ({
    //
  }),
}
</script>
