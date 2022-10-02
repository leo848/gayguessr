<template>
  <v-sheet
    class="flex-button d-flex justify-space-between rounded-lg v-btn v-btn--x-large py-4 px-2"
    type="button"
    v-ripple
    >
    <slot />
  </v-sheet>
</template>

<script lang="ts">
export default {
  name: 'FlexBtn',
}
</script>

<style scoped>
.flex-button {
  font-size: 1.125rem;
}

.flex-button:hover {
  transform: scale(1.08);
}
</style>
