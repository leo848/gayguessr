<template>
  <IdentityInfo :id="flag" always-show>
  <Flag :preset="flag" :width="width"/>
  </IdentityInfo>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import IdentityInfo from './IdentityInfo.vue';

import flagOfTheDay from '../flags/flagOfTheDay';

export default {
  name: 'FlagOfTheDay',
  components: { Flag, IdentityInfo },
  props: {
    width: {
      type: String,
      required: false,
    },
  },
  computed: {
    flag() {
      return flagOfTheDay();
    }
  },
}
</script>
