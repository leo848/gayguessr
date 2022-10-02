<template>
  <v-container>
    <GameComponent class="mt-2" @done="showAlert" />
  </v-container>
</template>

<script lang="ts">
import GameComponent from '../components/Game.vue'

import type { Game } from '../types/game'

export default {
  name: 'Game',
  components: { GameComponent },
  data: () => ({
    //
  }),
  methods: {
    showAlert(game: Game) {
      alert(`You got ${game.playedFlags.filter(o => o.correct).length} out of ${game.playedFlags.length} correct!`);
    },
  },
}
</script>
