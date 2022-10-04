<template>
  <v-tooltip top :max-width="maxWidth">
    <template v-slot:activator="{ props }">
      <v-btn :icon="icon" variant="text" v-bind="props" />
    </template>
    <slot />
  </v-tooltip>
</template>

<script lang="ts">
export default {
  name: 'InfoTooltip',
  props: {
    text: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: String,
      default: '300px',
    },
    icon: {
      type: String,
      default: 'mdi-information',
    },
  },
}
</script>
