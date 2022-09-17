<template>
  <canvas id="flag" class="rounded-xl" width="700" height="500"></canvas>
</template>

<script lang="ts">
import { Flag } from "../flags/flag";

export default {
  name: 'Flag',
  props: {
    preset: {
      type: String,
      required: false
    }
  },
  data: () => ({
    presets: {
      "pride": Flag.horizontal([
        "#ff0000",
        "#ff7f00",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#4b0082",
      ])
    }
  }),
  mounted() {
    const canvas = document.getElementById("flag") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (this.preset in this.presets) {
      this.presets[this.preset].paint(ctx);
    }
  }
}
</script>
