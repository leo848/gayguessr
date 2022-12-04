<template>
  <v-menu v-if="label || alwaysShow" offset-y>
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot />
      </div>
    </template>
    <v-card max-width="400">
      <v-card-title>{{ id }}</v-card-title>
      <v-card-text>
        {{ label?.description || "No description yet." }}
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Label, loadLabels } from '../metadata/label';

export default {
  name: 'LabelInfo',
  props: {
    id: {
      type: String,
      required: true
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    label: null as null | Label
  }),
  async created() {
    this.label = (await loadLabels())[this.id]
    if (this.label == null) {
      console.error("No metadata for: " + this.id);
    }
  }
}
</script>
