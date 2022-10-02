<template>
  <IdentityInfo :id="flag" always-show>
  <Flag :preset="flag" :width="300"/>
  </IdentityInfo>
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
