<template>
  <v-container>
    <v-row v-if="label">
      <v-col cols="12" md="6">
        <v-card :title="label.title" :text="label.description"/>
      </v-col>
      <v-col cols="12" md="6">
        <Flag :preset="label.title" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { loadLabel, Label } from '../metadata/label';

import Flag from '../components/Flag.vue';

export default {
  name: "LabelView",
  components: { Flag },
  data: () => ({
    label: null as null | Label,
  }),
  async beforeRouteUpdate(to, _from) {
    this.label = await loadLabel(to.params.id as string);
  },
  async created() {
    this.label = await loadLabel(this.$route.params.id as string);
  }
}
</script>
