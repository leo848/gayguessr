<template>
  <v-sheet
    class="
    flex-button
    d-flex
    justify-space-between
    rounded-lg
    v-btn
    v-btn--x-large
    elevation-4
    px-2"
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
</style>
