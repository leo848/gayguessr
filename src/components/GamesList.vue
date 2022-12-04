<template>
  <v-row style="min-height: 100%">
    <v-col v-if="!noNewGame" cols="12" sm="6" md="4" xl="3">
      <v-card @click="dialog = true">
        <v-card-title class="text-h4">new game</v-card-title>
        <v-card-text>
          <v-icon size="80">mdi-plus-circle</v-icon>
        </v-card-text>
        <v-dialog v-model="dialog" max-width="600px">
          <NewGameDialog @cancel="dialog = false" />
        </v-dialog>
      </v-card>
    </v-col>
    <v-col
      v-for="game in games.slice().reverse().slice(0, amount)"
      :key="game.id"
      cols="12"
      sm="6"
      md="4"
      xl="3"
      >
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
</template>

<script lang="ts">
import NewGameDialog from './NewGameDialog.vue';

export default {
  name: "GamesList",
  components: { NewGameDialog },
  props: {
    games: {
      type: Array,
      required: true
    },
    amount: {
      type: Number,
      default: 5
    },
    noNewGame: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    formatDate(date: Date) {
      return new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
        style: "long"
      }).format(
        Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        "day"
      );
    },
  },
  emits: ["reload"]
};
</script>

