<template>
  <v-container>
    <GameComponent class="mt-2" @done="showAlert" />
    <v-dialog v-model="gameDialog" persistent>
      <v-card v-if="game">
        <v-card-title>Well done!</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="2">
            <v-progress-circular
              :model-value="100 * game.playedFlags.filter(f => f.correct).length / game.playedFlags.length"
              color="green"
              size="64"
              width="8"
              />
            </v-col>
            <v-col>
              <p class="text-h5">
                Correct: {{ game.playedFlags.filter(f => f.correct).length }} out of {{ game.playedFlags.length }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="close">Return to dashboard</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import GameComponent from '../components/Game.vue'

import type { Game } from '../storage/types'
import { loadGames, saveGame } from '../storage/storage'

export default {
  name: 'Game',
  components: { GameComponent },
  data: () => ({
    gameDialog: false,
    game: null as Game | null,
  }),
  methods: {
    showAlert(game: Game) {
      this.game = game;
      this.gameDialog = true;
    },
    close() {
      this.gameDialog = false;
      saveGame(this.game);
      this.game = null;
      this.$router.push('/');
    },
  },
}
</script>
