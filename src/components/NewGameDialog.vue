<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h4 mb-2">Start a new game</h2>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-if="limit" cols="12">
            <v-row>
              <v-col cols="6" sm="9">
                Amount of flags:
                <v-slider
                  required
                  thumb-label
                  v-model="settings.limit"
                  step="1"
                  min="4"
                  :max="maxFlags()"
                  />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field min="4" :max="maxFlags()" type="number" v-model="settings.limit" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="timeLimit" cols="12">
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
            <v-btn v-if="!limit" @click="settings.limit = 10; limit = true">Limit the amount of flags</v-btn> <br/>
            <v-btn v-if="!timeLimit" @click="timeLimit = true">Add time limit</v-btn>
          </v-col>
          <v-col cols="12">
            You will play {{ flags() }} flags.
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="start">Start</v-btn>
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
    timeInput: { type: 'minutes' as 'minutes' | 'seconds' | 'hours', amount: 1 },
    limit: false,
    timeLimit: false,
  }),
  watch: {
    timeInput(_old, newTimeInput) {
      let amount = newTimeInput.amount;
      if (newTimeInput.type === 'seconds') amount *= 1;
      else if (newTimeInput.type === 'minutes') amount *= 60;
      else if (newTimeInput.type === 'hours') amount *= 3600;
      this.settings.timeLimit = amount;
    },
  },
  methods: {
    start() {
      changeGameSettings(this.settings);
      this.$router.push('./game');
    },
    maxFlags() {
      return Object.keys(flagPresets).length;
    },
    flags() {
      return Math.min(
        this.maxFlags(),
        this.settings.limit ?? Infinity,
      );
    }
  }
}
</script>
