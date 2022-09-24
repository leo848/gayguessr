<template>
  <v-row>
    <v-col cols="12" align="center">
      <v-row>
        <v-col cols="3" />
        <MultipleProgressBar
          :values="correctAnswers"
          :max-width="width"
          :length="20"
          :colors="{0:'#bb0000',1:'#008800'}"
          />
        <v-col cols="3" />
      </v-row>
    </v-col>
    <v-col cols="12" align="center">
      <Flag :width="width" :preset="flagPreset" :key="flagIndex"/>
    </v-col>
    <v-col cols="1" sm="2" md="3" />
    <v-col cols="10" sm="8" md="6" align="center">
      <v-row>
        <v-col cols="12" sm="6" align="end">
          <v-btn block @click="rightAnswer" size="x-large">Option 1</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn block @click="wrongAnswer" size="x-large">Option 2</v-btn>
        </v-col>
        <v-col cols="12" sm="6" align="end">
          <v-btn block @click="wrongAnswer" size="x-large">Option 3</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn block @click="wrongAnswer" size="x-large">Option 4</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1" sm="2" md="3" />
  </v-row>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import MultipleProgressBar from './MultipleProgressBar.vue';
import { flagPresets } from '../flags/flagPresets';

export default {
  name: 'Game',
  components: { Flag, MultipleProgressBar },
  data: () => ({
    correctAnswers: [],
    width: 500,
    allFlags: Object.keys(flagPresets).sort(() => Math.random() - 0.5),
    flagIndex: 0,
  }),
  computed: {
    flagPreset() {
      return this.allFlags[this.flagIndex];
    },
  },
  methods: {
    rightAnswer() {
      this.answer();
      this.correctAnswers.push(1);
    },
    wrongAnswer() {
      this.answer();
      this.correctAnswers.push(0);
    },
    answer() {
      this.flagIndex++;
    }
  },
}
</script>
