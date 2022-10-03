<template>
  <canvas id="flag-canvas" class="rounded-xl"></canvas>
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
    ratio: {
      type: Number,
      default: 7/5
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      required: false
    },
  },
  data: () => ({
    canvas: null as null | HTMLCanvasElement,
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
  created() {
    this.flagWidth = this.width;
    if (this.flagWidth > window.innerWidth - 20) {
      this.flagWidth = window.innerWidth - 20;
      this.flagHeight = this.flagWidth / this.ratio;
    }
  },
  mounted() {
    this.canvas = document.getElementById("flag-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.displayFlag = this.flag;

    this.resizeCanvas();

    window.addEventListener("resize", this.resizeCanvas);
  },
  methods: {
    resizeCanvas() {
      this.canvas.style.width = this.width;
      this.canvas.style.height = this.height ?? this.canvas.offsetWidth / this.ratio + "px";
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.displayFlag.paint(this.ctx);
    }
  }
}
</script>
