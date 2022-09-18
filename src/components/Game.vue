<template>
  <v-row>
    <v-col cols="12" align="center">
      <Flag :width="width" random />
    </v-col>
    <v-col cols="12" sm="6" align="end">
      <v-btn size="x-large">Option 1</v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn size="x-large">Option 2</v-btn>
    </v-col>
    <v-col cols="12" sm="6" align="end">
      <v-btn size="x-large">Option 3</v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn size="x-large">Option 4</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Flag from './Flag.vue';

export default {
  name: 'Game',
  components: { Flag },
  data: () => ({
    width: 500,
  }),
}
</script>
