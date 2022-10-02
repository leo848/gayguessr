<template>
  <v-sheet
    class="flex-button d-flex justify-space-between rounded-lg v-btn v-btn--x-large px-2"
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
  height: 52px;
}

.flex-button:hover {
  transform: scale(1.08);
}
</style>
