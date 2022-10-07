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
          <p class="text-h5">{{ search ? `${ flags.filter(test).length } flags found` : `Showing ${ flags.filter(test).length } flags` }}
            <span v-if="search" class="text-disabled">{{ regex ? `matching ${ search }` : `containing ${ search }` }}</span>
          </p>
        </v-col>
        <v-col v-for="(name, index) in flags" :key="name + index" v-show="test(name)" cols="12" sm="6" lg="4">
          <IdentityInfo :id="name" always-show>
          <v-card>
            <v-card-title v-html="highlight(name, search)" />
            <v-card-text>
              <Flag :preset="name" />
            </v-card-text>
          </v-card>
          </IdentityInfo>
        </v-col>
        <v-col cols="12" sm="6" lg="4" v-if="flags.filter(test).length === 0">
          <v-card color="error">
            <v-card-text>
              <p class="text-h3 mb-4">No flags found</p>
              <p class="text-h5">
                You want to suggest or add a flag or identity?
                Open an <v-btn :href="'https://github.com/leo848/gayguessr/issues/new?assignees=&labels=flag-request&template=request-a-flag---identity.md&title=Add%20'+search" target="_blank" variant="tonal" size="large">issue</v-btn>
                on <v-btn href="https://github.com/leo848/gayguessr/" variant="tonal">GitHub</v-btn>.
              </p>
            </v-card-text>
          </v-card>
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
        if (!regex) throw e;
        this.error = e.message;
        return /./g;
      }
    },
  },
  created() {
    // const random = seededRandom(new Date().toUTCString());
    // this.flags = shuffle(this.flags, random);

    this.flags = this.flags.sort();

    console.log(this.$route);
    this.search = this.$route.query.query as string || "";
  },
  watch: {
    search() {
      this.$router.replace({ query: { query: this.search } });
    },
  },
  methods: {
    test(text: string) {
      if (this.regex) {
        return this.searchRegex.test(text);
      } else {
        return text.toLowerCase().includes(this.search.toLowerCase());
      }
    },
    highlight(text: string, search: string) {
      if (!search) return text;
      const re = this.searchRegex;
      return text.replace(re, match => `<span class="text-success">${ match }</span>`);
    }
  }
}
</script>
