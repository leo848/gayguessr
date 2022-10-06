<template>
  <v-container>
    <GameComponent :settings="gameSettings" class="mt-2" @done="showAlert" />
    <v-dialog v-model="gameDialog" max-width="500px" persistent>
      <v-card v-if="game">
        <v-card-title>{{
          !game.playedFlags.length ?
            ":("
            : reason === "time" ?
              "Time's up!" : "Well done!"
          }}</v-card-title>
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
import { loadGameSettings, saveGame } from '../storage/storage'

export default {
  name: 'Game',
  components: { GameComponent },
  data: () => ({
    gameDialog: false,
    reason: null as { reason: string } | undefined,
    game: null as Game | null,
    gameSettings: loadGameSettings(),
  }),
  methods: {
    showAlert(game: Game, reason: { reason: string }) {
      this.game = game;
      this.reason = reason?.reason ?? null;
      this.gameDialog = true;
    },
    close() {
      this.gameDialog = false;
      if (this.game.playedFlags.length) saveGame(this.game);
      this.game = null;
      this.$router.push(import.meta.env.BASE_URL);
    },
  },
}
</script>
