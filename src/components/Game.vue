<template>
  <v-row>
    <v-col cols="12" align="center">
      <v-row>
        <v-col cols="3" />
        <MultipleProgressBar
          :values="correctAnswers"
          :max-width="width"
          :length="flagAmount"
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
        <v-col v-for="option, index in options" :key="option" cols="12" sm="6">
            <v-btn
              @click="answer(option)"
              :color="buttonColor(index)"
              :style="buttonStyle(index)"
              block
              size="x-large"
              >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <IdentityHover :id="option">
                  <v-icon>mdi-information</v-icon>
                  </IdentityHover>
                </div>

                <div class="flex-grow-1">
                  {{ option }}
                </div>
                <div v-if="answered && selectedOption === option" class="mr-auto">
                  <v-icon>{{ isCorrect(option) ? "mdi-check" : "mdi-check" }}</v-icon>
                </div>
              </div>
            </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1" sm="2" md="3" />
  </v-row>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import MultipleProgressBar from './MultipleProgressBar.vue';
import IdentityHover from './IdentityHover.vue';

import { flagPresets } from '../flags/flagPresets';
import { parseColor, isBright } from '../flags/color';

export default {
  name: 'Game',
  components: { Flag, MultipleProgressBar, IdentityHover },
  data: () => ({
    correctAnswers: [],
    selectedOption: null as string | null,
    width: 500,
    allFlags: Object.keys(flagPresets).sort(() => Math.random() - 0.5),
    flagIndex: 0,
    flagAmount: Object.keys(flagPresets).length,
    answered: false,
  }),
  computed: {
    flagPreset() {
      return this.allFlags[this.flagIndex];
    },
    options() {
      const options = [this.flagPreset];
      while (options.length < 4) {
        const randomFlag = this.allFlags[Math.floor(Math.random() * this.allFlags.length)];
        if (!options.includes(randomFlag)) {
          options.push(randomFlag);
        }
      }
      return options.sort(() => Math.random() - 0.5);
    },
    buttonColor() {
      let shuffledColors = flagPresets[this.flagPreset].colors().sort(() => Math.random() - 0.5);
      return (index: number) => {
        if (this.answered) {
          if (this.isCorrect(this.options[index])) {
            return 'green';
          } else {
            return 'red';
          }
        }

        return shuffledColors[index % shuffledColors.length];
      };
    }
  },
  methods: {
    answer(option: string) {
      if (this.answered) {
        this.answered = false;
        this.flagIndex++;
        return;
      }
      if (this.isCorrect(option)) {
        this.correctAnswers.push(1);
      } else {
        this.correctAnswers.push(0);
      }
      this.selectedOption = option;
      this.answered = true;
    },
    isCorrect(answer: string) {
      return answer === this.flagPreset;
    },
    buttonStyle(index: number): string {
      const colorString = this.buttonColor(index);
      try {
        const color = parseColor(colorString);

        return `color: ${isBright(color, 160) ? "black" : "white"} !important`;
      } catch (e) {
        return "";
      }
    },
  },
}
</script>
