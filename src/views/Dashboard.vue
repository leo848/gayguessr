<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">
        <GamesList :games="games" :amount="5" />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card>
          <v-card-text>
            <h2 class="text-h4">
              Flag of the day ({{ new Date().toLocaleDateString() }})
              <v-tooltip top max-width="300px">
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-information" variant="text" v-bind="props" />
                </template>
                <span>
                  The flag of the day is calculated based on the hash of the current day
                  and is dependent on the amount of flags. This means that as more flags
                  get added, the flag of the day might change more than once per day.
                </span>
              </v-tooltip>
            </h2>
            <p class="mb-4">Click for more information.</p>
            <FlagOfTheDay width="70%" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card>
          <v-card-text>
            <h2 class="text-h4 mb-2">Stats</h2>
            <p class="text-h5">Total time played: {{ totalTimePlayed() }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { loadGames } from '../storage/storage'
import type { Game } from '../storage/types'

import FlagOfTheDay from '../components/FlagOfTheDay.vue'
import GamesList from '../components/GamesList.vue'

import { Duration } from 'luxon'

export default {
  name: 'Dashboard',
  data: () => ({
    games: loadGames(),
  }),
  methods: {
    totalTimePlayed() {
      // The total time played is the sum of all the time played in all the games.
      // Luxon is used to format the duration, which doesn't give a nice way to 
      // format the duration in a human-readable, so it's done manually.

      let totalTimeSeconds = Math.floor(
        this.games.reduce(
          (acc: number, game: Game) =>
            acc + game.timeEnded.getTime() - game.timeStarted.getTime(), 0
        ) / 1000
      );

      const days = totalTimeSeconds / 86400 > 1 ? Math.floor(totalTimeSeconds / 86400) : undefined;
      totalTimeSeconds = totalTimeSeconds % 86400;
      const hours = totalTimeSeconds / 3600 > 1 ? Math.floor(totalTimeSeconds / 3600) : undefined;
      totalTimeSeconds = totalTimeSeconds % 3600;
      const minutes = totalTimeSeconds / 60 > 1 ? Math.floor(totalTimeSeconds / 60) : undefined;
      totalTimeSeconds = totalTimeSeconds % 60;
      const seconds = Math.floor(totalTimeSeconds);

      return Duration.fromObject({ days, hours, minutes, seconds }).normalize().toHuman()
    },
  },
  components: { FlagOfTheDay, GamesList },
}
</script>
