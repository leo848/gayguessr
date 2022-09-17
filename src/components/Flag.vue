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
        "#e40303",
        "#ff8c00",
        "#ffed00",
        "#008026",
        "#24408e",
        "#732982",
      ]),
      "trans": Flag.horizontal([
        "5bcefa",
        "f5a9b8",
        "ffffff",
        "f5a9b8",
        "5bcefa",
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
