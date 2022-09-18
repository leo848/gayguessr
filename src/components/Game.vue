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
      <Flag :width="width" random />
    </v-col>
    <v-col cols="12" sm="6" align="end">
      <v-btn @click="rightAnswer" size="x-large">Option 1</v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn @click="wrongAnswer" size="x-large">Option 2</v-btn>
    </v-col>
    <v-col cols="12" sm="6" align="end">
      <v-btn @click="wrongAnswer" size="x-large">Option 3</v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn @click="wrongAnswer" size="x-large">Option 4</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import MultipleProgressBar from './MultipleProgressBar.vue';

export default {
  name: 'Game',
  components: { Flag, MultipleProgressBar },
  data: () => ({
    correctAnswers: [],
    width: 500,
  }),
  methods: {
    rightAnswer() {
      this.correctAnswers.push(1);
    },
    wrongAnswer() {
      this.correctAnswers.push(0);
    },
  },
}
</script>
