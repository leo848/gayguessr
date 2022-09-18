<template>
  <canvas id="flag" class="rounded-xl" :width="width" :height="height"></canvas>
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
      default: 700,
    },
    height: {
      type: Number,
      default: (props: {width: number, ratio: number}) => props.width / props.ratio
    },
  },
  data: () => ({
    flag: null as Flag | null,
    ctx: null as CanvasRenderingContext2D | null,
    presets: flagPresets,
  }),
  watch: {
    flag(_oldFlag: Flag|null, newFlag: Flag|null) {
      if (newFlag == null) return;
      newFlag.paint(this.ctx);
    }
  },
  mounted() {
    const canvas = document.getElementById("flag") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d");

    if (this.preset in this.presets) {
      this.flag = this.presets[this.preset]
    }

    if (this.random) {
      this.flag = this.presets[Object.keys(this.presets)[Math.floor(Math.random() * Object.keys(this.presets).length)]];
    }

    this.flag.paint(this.ctx);
  }
}
</script>
