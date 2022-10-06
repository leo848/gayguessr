<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h4 mb-2">Start a new game</h2>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select v-model="settings.stopAfter.type" :items="stopAfterItems" label="Stop game after..."></v-select>
          </v-col>
          <v-col v-if="settings.stopAfter.type === 'amount'" cols="12">
            <v-row>
              <v-col cols="9">
                <v-slider required v-model="settings.stopAfter.amount" step="1" min="4" :max="maxFlags()" />
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" v-model="settings.stopAfter.amount" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-else-if="settings.stopAfter.type === 'time'" cols="12">
            <v-row>
              <v-col cols="6">
                <v-text-field type="number" v-model="timeInput.amount" />
              </v-col>
              <v-col cols="6">
                <v-select :items="['seconds','minutes','hours']" v-model="timeInput.type" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            You will play {{ flags() }} flags.
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="./game">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { flagPresets } from '../flags/flagPresets'
import { loadGameSettings, changeGameSettings } from '../storage/storage'

export default {
  name: "NewGameDialog",
  data: () => ({
    settings: loadGameSettings(),
    stopAfterItems: [
      { value: 'all', title: 'Play all flags' },
      { value: 'amount', title: 'Limit to a specific amount' },
      { value: 'time', title: 'Only play for a limited amount of time' },
    ],
    timeInput: { type: 'minutes' as 'minutes' | 'seconds' | 'hours', amount: 1 }
  }),
  watch: {
    timeInput(_old, newTimeInput) {
      this.settings.stopAfterItems.type = 'time';
      let amount = newTimeInput.amount;
      if (newTimeInput.type === 'seconds') amount *= 1;
      else if (newTimeInput.type === 'minutes') amount *= 60;
      else if (newTimeInput.type === 'hours') amount *= 3600;
      this.settings.stopAfterItems.amount = amount;
    }
  },
  methods: {
    maxFlags() {
      return Object.keys(flagPresets).length;
    },
    flags() {
      return Math.min(
        this.maxFlags(),
        this.settings.stopAfter.type === 'amount' ? this.settings.stopAfter.amount : Infinity,
      );
    }
  }
}
</script>
