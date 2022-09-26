<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot />
      </div>
    </template>
    <v-card max-width="400" v-if="identity">
      <v-card-title>{{ id }}</v-card-title>
      <v-card-text>
        {{ identity.description }}
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Identity, loadIdentity } from '../metadata/identity';

export default {
  name: 'IdentityHover',
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
    try {
      this.identity = await loadIdentity(import.meta.env.BASE_URL, this.id);
    } catch (e) {
      console.error("No metadata for: " + this.id);
      throw e;
    }
  }
}
</script>
