<template>
  <v-container>
    <h1>gayguessr</h1>
    <v-col>
      <Flag preset="bi" />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Flag from "./Flag.vue";
export default {
  name: 'HelloWorld',
  components: { Flag },
  data: () => ({ }),
}
</script>
