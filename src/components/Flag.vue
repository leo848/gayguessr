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
    flag: null as Flag | null,
    ctx: null as CanvasRenderingContext2D | null,
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
      ]),
      "agender": Flag.horizontal([
        "#000000",
        "#bcc4c7",
        "#ffffff",
        "#b7f684",
        "#ffffff",
        "#bcc4c7",
        "#000000",
      ]),
      "ace": Flag.horizontal([
        "#000000",
        "#a3a3a3",
        "#ffffff",
        "#800080",
      ]),
      "pan": Flag.horizontal([
        "#ff218c",
        "#ffd800",
        "#21b1ff",
      ])
    }
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
