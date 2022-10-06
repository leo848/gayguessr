<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">
        <GamesList :games="games" @reload="loadGames" :amount="5" />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card>
          <v-card-text>
            <h2 class="text-h4">
              Flag of the day ({{ new Date().toLocaleDateString() }})
              <InfoTooltip>
                  The flag of the day is calculated based on the hash of the current day
                  and is dependent on the amount of flags. This means that as more flags
                  get added, the flag of the day might change more than once per day.
              </InfoTooltip>
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
            <p class="text-h5">Amount of games: {{ games.length }}</p>
            <p class="text-h5">
              Total time played: {{ totalTimePlayed() }}
              <InfoTooltip>
                  The total time played is based on the amount of time spent in each game,
                  i.e. the difference between the start and end time of each game.
              </InfoTooltip>
            </p>
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
import InfoTooltip from '../components/InfoTooltip.vue'
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
      const minutes = !days && totalTimeSeconds / 60 > 1 ? Math.floor(totalTimeSeconds / 60) : undefined;
      totalTimeSeconds = totalTimeSeconds % 60;
      const seconds = !days && !hours && !minutes && Math.floor(totalTimeSeconds) || undefined;

      return Duration.fromObject({ days, hours, minutes, seconds }).normalize().toHuman()
    },
    loadGames() {
      this.games = loadGames()
    }
  },
  components: { FlagOfTheDay, GamesList, InfoTooltip },
}
</script>
