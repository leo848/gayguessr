<template>
  <v-container>
    <Game class="mt-2" />
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
