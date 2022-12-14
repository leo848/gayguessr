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
        <v-col cols="3"/>
      </v-row>
    </v-col>
    <v-col cols="12" align="center">
      <v-row>
        <v-col cols="3" />
        <MultipleProgressBar
          v-if="timer != null"
          :values="timeProgress"
          :max-width="width"
          :length="settings.timeLimit"
          :colors="{0: '#ff9900', 1: '#000000'}"
          />
        <v-col cols="3" />
      </v-row>
    </v-col>
    <v-col cols="12" align="center">
      <Flag :width="width + 'px'" :preset="flagPreset" :key="flagIndex"/>
    </v-col>
    <v-col cols="1" sm="2" lg="3" />
    <v-col cols="10" sm="8" lg="6" align="center">
      <v-row>
        <v-col v-for="option, index in options" :key="option" cols="12" sm="6">
          <FlexBtn
            @click="answer(option)"
            :color="buttonColor(index)"
            :style="buttonStyle(index)"
            class="option-button"
            block
            size="x-large"
            >
            <div>
              <LabelInfo :id="option">
              <v-icon>mdi-information</v-icon>
              </LabelInfo>
            </div>

            <v-spacer />

            <div>
              {{ option }}
            </div>

            <v-spacer />

            <div v-if="answered && selectedOption === option">
              <v-icon>{{ isCorrect(option) ? "mdi-check" : "mdi-close" }}</v-icon>
            </div>
          </FlexBtn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1" sm="2" lg="3" />
  </v-row>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import MultipleProgressBar from './MultipleProgressBar.vue';
import LabelInfo from './LabelInfo.vue';
import FlexBtn from './FlexBtn.vue';

import { flagPresets } from '../flags/flagPresets';
import { parseColor, isBright } from '../flags/color';

import type { Game } from '../types/game';
import { GameSettings } from '../storage/types';

export default {
  name: 'Game',
  components: { Flag, MultipleProgressBar, LabelInfo, FlexBtn },
  props: {
    settings: {
      type: Object as () => GameSettings,
      required: true,
    }
  },
  data: () => ({
    correctAnswers: [],
    game: {
      timeStarted: new Date(),
      timeEnded: null,
      playedFlags: [],
    } as Game,
    selectedOption: null as string | null,
    width: 500,
    allFlags: Object.keys(flagPresets).sort(() => Math.random() - 0.5),
    flagIndex: 0,
    answered: false,
    timer: null as null | number,
  }),
  computed: {
    timeProgress() {
      let arr = [];
      for (let i = 0; i < this.settings.timeLimit; i++) {
        arr.push(i < this.timer ? 0 : 1);
      }
      return arr;
    },
    flagPreset() {
      return this.allFlags[this.flagIndex];
    },
    flagAmount() {
      return this.settings.limit ?? Object.keys(flagPresets).length;
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
  created() {
    if (this.settings.timeLimit) {
      const timeLimit = this.settings.timeLimit;
      this.timer = timeLimit;
      setTimeout(() => {
        this.endGame({ reason: 'time' }); 
      }, timeLimit * 1000);
      let date = new Date();
      setInterval(() => {
        let delta = +new Date()-+date;
        if (this.timer > 0 && delta > 1000) {
          delta %= 1000;
          date = new Date(+new Date());
          this.timer--;
        }
      }, 100)
    }
  },
  methods: {
    answer(option: string) {
      if (this.answered) {
        if (this.flagIndex >= this.flagAmount - 1) {
          this.endGame();
          return;
        }
        this.answered = false;
        this.flagIndex++;
        return;
      }

      let correct: boolean = this.isCorrect(option);
      this.game.playedFlags.push({
        flag: this.flagPreset,
        chosen: option,
        correct,
      });
      this.correctAnswers.push(correct ? 1 : 0);
      this.selectedOption = option;
      this.answered = true;
    },
    endGame(reason?:{reason: string}) {
      this.game.timeEnded = new Date();
      this.$emit('done', this.game, reason);
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
  emits: ['done'],
}
</script>
