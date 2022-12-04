<template>
  <LabelInfo :id="flag" always-show>
  <Flag :preset="flag" :width="width"/>
  </LabelInfo>
</template>

<script lang="ts">
import Flag from './Flag.vue';
import LabelInfo from './LabelInfo.vue';

import flagOfTheDay from '../flags/flagOfTheDay';

export default {
  name: 'FlagOfTheDay',
  components: { Flag, LabelInfo },
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
