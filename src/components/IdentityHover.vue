<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot />
      </div>
    </template>
    <v-card>
      <v-card-title>{{ identity }}</v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, earum! Velit provident quos distinctio natus perferendis ratione, consequatur sequi aut neque.
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
export default {
  name: 'IdentityHover',
  props: {
    identity: {
      type: String,
      required: true
    }
  },
  created() {
    console.log(this.identity)
  }
}
</script>
