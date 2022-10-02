<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot />
      </div>
    </template>
    <v-card max-width="400">
      <v-card-title>{{ id }}</v-card-title>
      <v-card-text>
        {{ identity?.description || "No description yet." }}
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Identity, loadIdentities } from '../metadata/identity';

export default {
  name: 'IdentityInfo',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    identity: null as null | Identity
  }),
  async created() {
    this.identity = (await loadIdentities())[this.id]
    if (this.identity == null) {
      console.error("No metadata for: " + this.id);
    }
  }
}
</script>
