<template>
  <v-col align="center">
    <Flag :width="500" random />
  </v-col>
</template>

<script>
import Flag from './Flag.vue';

export default {
  name: 'Game',
  components: { Flag },
  data: () => ({
    //
  }),
}
</script>
