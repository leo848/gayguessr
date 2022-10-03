<template>
  <v-container>
    <v-row v-if="identity">
      <v-col cols="12" md="6">
        <v-card :title="identity.title" :text="identity.description"/>
      </v-col>
      <v-col cols="12" md="6">
        <Flag :preset="identity.title" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { loadIdentity, Identity } from '../metadata/identity';

import Flag from '../components/Flag.vue';

export default {
  name: "IdentityView",
  components: { Flag },
  data: () => ({
    identity: null as null | Identity,
  }),
  async beforeRouteUpdate(to, from) {
    this.identity = await loadIdentity(to.params.id as string);
  },
  async created() {
    this.identity = await loadIdentity(this.$route.params.id as string);
  }
}
</script>
