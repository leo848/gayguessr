<template>
  <canvas id="flag-canvas" class="rounded-xl" :width="width" :height="height"></canvas>
</template>

<script lang="ts">
import { Flag } from "../flags/flag";
import { flagPresets } from "../flags/flagPresets";

export default {
  name: 'Flag',
  props: {
    preset: {
      type: String,
      required: false
    },
    flag: {
      type: Object,
      default: (props: {preset ?: string}) => {
        if (props.preset) {
          return flagPresets[props.preset];
        } else {
          return Flag.defaultFlag();
        }
      },
      validator: (value: object) => {
        return value instanceof Flag;
      }
    },
    random: {
      type: Boolean,
      default: false,
    },
    ratio: {
      type: Number,
      default: 7 / 5,
    },
    width: {
      type: Number,
      default: (props: {height ?: number, ratio: number}) => (props.height ?? 500) * props.ratio,
    },
    height: {
      type: Number,
      default: (props: {width ?: number, ratio: number}) => (props.width ?? 700) / props.ratio
    },
  },
  data: () => ({
    ctx: null as CanvasRenderingContext2D | null,
    displayFlag: null as Flag | null,
    presets: flagPresets,
  }),
  watch: {
    flag(_oldFlag: Flag|null, newFlag: Flag|null) {
      if (newFlag == null) return;
      newFlag.paint(this.ctx);
    }
  },
  mounted() {
    const canvas = document.getElementById("flag-canvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d");

    this.displayFlag = this.flag;

    if (this.random) {
      this.displayFlag = this.presets[Object.keys(this.presets)[Math.floor(Math.random() * Object.keys(this.presets).length)]];
    }

    this.displayFlag.paint(this.ctx);
  }
}
</script>
