<template>
  <v-container>
    <h1>gayguessr</h1>
    <v-col align="center">
      <Flag random @click="changeKey" :key="key"/>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Flag from "./Flag.vue";
export default {
  name: 'HelloWorld',
  components: { Flag },
  methods: {
    changeKey() {
      this.key++;
      return false;
    }
  },
  data: () => ({
    key: 0,
  }),
}
</script>
