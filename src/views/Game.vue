<template>
  <v-container>
    <GameComponent class="mt-2" />
  </v-container>
</template>

<script lang="ts">
import GameComponent from '../components/Game.vue'

export default {
  name: 'Game',
  components: { GameComponent },
  data: () => ({
    //
  }),
}
</script>
