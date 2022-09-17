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
    },
    random: {
      type: Boolean,
      default: false,
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
      ]),
      "enby": Flag.horizontal([
        "fcf434",
        "ffffff",
        "9c59d1",
        "2c2c2c",
      ]),
      "bi": Flag.horizontalWithRatio([
        ["d60270", 2],
        ["9b4f96", 1],
        ["0038a8", 2],
      ]),
      "mlm": Flag.horizontal([
        "#078d70",
        "#26ceaa",
        "#98e8c1",
        "#ffffff",
        "#7bade2",
        "#5049cc",
        "#3d1a78",
      ]),
      "lesbian": Flag.horizontal([
        "#d52d00",
        "#ef7627",
        "#ff9a55",
        "#ffffff",
        "#d162a4",
        "#b55690",
      ])
    }
  }),
  mounted() {
    const canvas = document.getElementById("flag") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (this.preset in this.presets) {
      this.presets[this.preset].paint(ctx);
    }

    if (this.random) {
      let randomFlag = this.presets[Object.keys(this.presets)[Math.floor(Math.random() * Object.keys(this.presets).length)]];
      randomFlag.paint(ctx);
    }
  }
}
</script>
