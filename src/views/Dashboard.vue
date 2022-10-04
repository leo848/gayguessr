<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">
        <GamesList :games="games" />
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { loadGames } from '../storage/storage'

import FlagOfTheDay from '../components/FlagOfTheDay.vue'
import GamesList from '../components/GamesList.vue'

export default {
  name: 'Dashboard',
  data: () => ({
    games: loadGames(),
  }),
  components: { FlagOfTheDay, GamesList },
}
</script>
