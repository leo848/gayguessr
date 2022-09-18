<template>
  <v-row class="pa-0 mb-4" no-gutters>
    <v-col class="rounded-pill" v-for="i in length" :style="`width: ${100 / values.length}%;`" :key="values[i - 1]">
      <v-progress-linear
        v-model="progress[i - 1]"
        :value="values[i - 1]"
        :color="colors[values[i - 1]]"
        :class="i == 1 ? 'pill-left' : i == length ? 'pill-right' : ''"
        :height="height" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: 'MultipleProgressBar',
  props: {
    values: {
      type: Array,
      required: true,
      validator(value: any) {
        return value.every((v: any) => typeof v === 'number');
      }
    },
    colors: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 10,
    },
    maxWidth: {
      type: Number,
      default: 500,
    },
    length: {
      type: Number,
      default(props: { values: number[] }) {
        return props.values.length - 1;
      },
    },
  },
  data: () => ({
    //
  }),
  computed: {
    progress(): number[] {
      let arr = [];
      for (let i = 0; i < this.values.length; i++) {
        arr.push(100);
      }
      for (let i = 0; i < this.length - this.values.length; i++) {
        arr.push(0);
      }
      return arr;
    }
  },
}
</script>

<style>
.pill-left {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.pill-right {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
