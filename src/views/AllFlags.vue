<template>
  <v-container>
    <v-row>
        <v-col cols="10">
          <v-text-field
            class="mt-4"
            v-model="search"
            :error="error !== null"
            :error-messages="error || undefined"
            append-icon="mdi-magnify"
            :label="regex ? 'Enter RegExp...' : 'Search...'"
            clearable
            single-line
            hide-details
            />
        </v-col>
        <v-col cols="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ props }">
              <v-btn :icon="regex ? 'mdi-cursor-text' : 'mdi-regex'" class="mt-4" v-bind="props" @click="regex = !regex" />
            </template>
            <span>{{ regex ? "Use text mode" : "Use RegExp mode" }}</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12">
          <p class="text-h5">{{ search ? `${ flags.filter(test).length } flags found` : `Showing ${ flags.filter(test).length } flags` }}</p>
        </v-col>
        <v-col v-for="name in flags" :key="name" v-show="test(name)" cols="12" sm="6" lg="4">
          <IdentityInfo :id="name" always-show>
          <v-card>
            <v-card-title v-html="highlight(name, search)" />
            <v-card-text>
              <Flag :preset="name" />
            </v-card-text>
          </v-card>
          </IdentityInfo>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Flag from '../components/Flag.vue';
import IdentityInfo from '../components/IdentityInfo.vue';
import { flagPresets } from '../flags/flagPresets';
import { seededRandom, shuffle } from '../utils/random';

export default {
  name: "AllFlags",
  components: { Flag, IdentityInfo },
  data: () => ({
    flags: Object.keys(flagPresets),
    search: "",
    error: null as string | null,
    regex: false,
  }),
  computed: {
    searchRegex() {
      const search = this.search.trim();
      const { flags, regex } = this;

      if (!search) return /./g;
      try {
        this.error = null;
        return regex ?
          new RegExp(search, 'g')
          : new RegExp(search.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&').replace('*', '.+?'), 'ig');
      } catch (e) {
        this.error = e.message;
        return flags;
      }
    },
  },
  created() {
    const random = seededRandom(new Date().toUTCString());
    this.flags = shuffle(this.flags, random);

    this.search = this.$route.query.search as string || "";
  },
  methods: {
    test(text: string) {
      return this.searchRegex.test(text);
    },
    highlight(text: string, search: string) {
      if (!search) return text;
      const re = this.searchRegex;
      return text.replace(re, match => `<span class="text-success">${ match }</span>`);
    }
  }
}
</script>
