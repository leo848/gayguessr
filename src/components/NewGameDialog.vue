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
              <v-col cols="5">
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
              <v-col cols="5">
                <v-text-field min="4" :max="maxFlags()" type="number" v-model="settings.limit" />
              </v-col>
              <v-col cols="2">
                <v-btn icon="mdi-close" @click="limit = false; settings.limit = undefined" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="timeLimit" cols="12">
            <v-row>
              <v-col cols="5">
                <v-text-field label="Time limit" type="number" v-model="timeInput.amount" />
              </v-col>
              <v-col cols="5">
                <v-select :items="['seconds','minutes','hours']" v-model="timeInput.type" />
              </v-col>
              <v-col cols="2">
                <v-btn icon="mdi-close" @click="timeLimit = false; settings.timeLimit = undefined" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-btn v-if="!limit" @click="settings.limit = 10; limit = true" block color="primary" size="large">
              Limit flag amount
            </v-btn>
            <br/>
            <v-btn v-if="!timeLimit" @click="timeInput.amount = 1; timeLimit = true" block color="primary" size="large">
              Add time limit
            </v-btn>
          </v-col>
          <v-col cols="12">
            You will play {{ flags() }} flags{{
            settings.timeLimit ?
              ` (${Math.round(settings.timeLimit / flags()*10)/10} seconds per flag)`
              : '.' 
            }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('cancel')" color="primary" text>Cancel</v-btn>
      <v-btn @click="restoreDefaultSettings" class="px-4">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="start" variant="elevated" size="x-large" class="px-4">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { flagPresets } from '../flags/flagPresets'
import { loadGameSettings, changeGameSettings, restoreDefaultSettings } from '../storage/storage'

export default {
  name: "NewGameDialog",
  data: () => ({
    settings: loadGameSettings(),
    timeInput: { type: 'minutes' as 'minutes' | 'seconds' | 'hours', amount: 2 },
    limit: false,
    timeLimit: false,
  }),
  created() {
    if (this.settings.limit) this.limit = true;
    if (this.settings.timeLimit) this.timeLimit = true;
  },
  watch: {
    timeInput: { deep: true, handler: function (_old, newTimeInput) {
      let amount = newTimeInput.amount;
      if (newTimeInput.type === 'seconds') amount *= 1;
      else if (newTimeInput.type === 'minutes') amount *= 60;
      else if (newTimeInput.type === 'hours') amount *= 3600;
      this.settings.timeLimit = amount;
    }},
  },
  methods: {
    start() {
      console.log(this.settings);
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
    },
    restoreDefaultSettings() {
      restoreDefaultSettings();
      this.settings = loadGameSettings();
      this.limit = false;
      this.timeLimit = false;
    }
  },
  emits: ['cancel'],
}
</script>
