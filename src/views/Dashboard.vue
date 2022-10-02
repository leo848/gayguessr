<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col cols="3">
        <v-card to="./game">
          <v-card-title>New Game</v-card-title>
          <v-card-text>
            <v-icon size="80">mdi-plus-circle</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Dashboard',
  data: () => ({
    //
  }),
}
</script>
