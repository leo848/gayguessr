<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h4 mb-2">Start a new game</h2>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="./game">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "NewGameDialog",
}
</script>
