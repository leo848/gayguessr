<template>
  <v-row>
    <v-col cols="12" sm="6" xl="4">
      <IdentityInfo :id="flag" always-show>
      <Flag :preset="flag"/>
      </IdentityInfo>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import IdentityInfo from './IdentityInfo.vue';

import flagOfTheDay from '../flags/flagOfTheDay';

export default {
  name: 'FlagOfTheDay',
  components: { Flag, IdentityInfo },
  computed: {
    flag() {
      return flagOfTheDay();
    }
  },

}
</script>
