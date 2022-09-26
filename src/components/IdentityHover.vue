<template>
  <v-menu transition="slide-x-transition">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        Dropdown
      </v-btn>
    </template>

    <v-card>
      <v-card-title>{{ identity }}</v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, earum! Velit provident quos distinctio natus perferendis ratione, consequatur sequi aut neque, iste modi ad tenetur harum reiciendis quisquam officiis suscipit.
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
