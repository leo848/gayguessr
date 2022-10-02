<template>
  <v-container>
    <h1 class="text-h3 mb-4">Dashboard</h1>
    <v-row>
      <v-col cols="2" sm="4">
        <v-card to="./game">
          <v-card-title class="text-h4">New Game</v-card-title>
          <v-card-text>
            <v-icon size="80">mdi-plus-circle</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-for="game in games.slice().reverse().slice(0, 5)" :key="game.id" cols="2" sm="4">
        <v-card height="100%">
          <v-card-title class="text-h4">#{{ game.id }}</v-card-title>
          <v-card-subtitle class="text-h6">
            {{ formatDate(game.timeStarted) }} 
          </v-card-subtitle>
          <v-card-text>
            <p>
              <b>{{ game.playedFlags.length }}</b> flags
              • <b>{{ game.playedFlags.filter(f => f.correct).length }}</b> 
              <span class="text-success"> correct</span>
              • <b>{{ game.playedFlags.filter(f => !f.correct).length }}</b> 
              <span class="text-error"> wrong</span>
            </p>
            <p>

            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <h2 class="text-h4 mt-6">
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
    <FlagOfTheDay />
  </v-container>
</template>

<script lang="ts">
import { loadGames } from '../storage/storage'

import FlagOfTheDay from '../components/FlagOfTheDay.vue'

export default {
  name: 'Dashboard',
  data: () => ({
    games: loadGames(),
  }),
  components: { FlagOfTheDay },
  methods: {
    formatDate(date: Date) {
      return Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    }
  }
}
</script>
