<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-text-field
          class="mt-4"
          v-model="search"
          @blur="search = improvedSearch"
          :error="error !== null"
          :error-messages="error || undefined"
          append-icon="mdi-magnify"
          :label="regex ? 'Enter RegExp...' : 'Search...'"
          clearable
          single-line
          hide-details
          />
      </v-col>
      <v-col cols="4">
        <v-tooltip bottom>
          <template v-slot:activator="{ props }">
            <v-btn :icon="regex ? 'mdi-regex' : 'mdi-cursor-text'" class="mt-4" v-bind="props" @click="regex = !regex" />
          </template>
          <span>{{ regex ? "RegExp mode (kinda buggy)" : "Text mode" }}</span>
        </v-tooltip>
        <v-menu v-if="filteredFlags.length > 1">
          <template v-slot:activator="{ props }">
            <v-btn :icon="lastChosenAlgorithm?.icon ?? 'mdi-sort-variant'" class="mt-4 ml-4" v-bind="props" />
          </template>
          <v-list>
            <v-list-subheader>Sort by</v-list-subheader>
            <v-list-item
              v-for="algorithm in sortAlgorithms"
              :key="algorithm.name"
              :variant="algorithm.name === lastChosenAlgorithm.name ? 'tonal' : undefined"
              @click="flags = algorithm.exec(flags); lastChosenAlgorithm = algorithm"
              >
              <template v-slot:prepend>
                <v-icon>{{ algorithm.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ algorithm.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-tooltip
          bottom
          v-if="filteredFlags.length > 1 && lastChosenAlgorithm && !lastChosenAlgorithm.hideReverse"
          >
          <template v-slot:activator="{ props }">
            <v-btn :icon="'mdi-sort-alphabetical-' + (reverse ? 'descending' : 'ascending')" class="mt-4 ml-4" v-bind="props" @click="reverse = !reverse; flags = flags.reverse()" />
          </template>
          <span>{{ reverse ? "Descending" : "Ascending" }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12">
        <p class="text-h5" v-if="filteredFlags.length > 0">
          <span v-if="!search">Showing&nbsp;</span>
          <v-scale-transition leave-absolute>
            <b :key="filteredFlags.length"> {{ filteredFlags.length }}&nbsp;</b>
          </v-scale-transition>
          <span>
            {{ (filteredFlags.length == 1 ? "flag" : "flags") + (search ? " found" : "") }}&nbsp;
          </span>
          <span v-if="search" class="text-disabled">{{ regex ? `matching ${ searchRegex }` : `containing ${ improvedSearch }` }}</span>
        </p>
        <p class="text-h5" v-else>
          No flags matched your search.<br/>
          <span v-if="suggestion">
            Did you mean: <i @click="search = suggestion" class="text-primary">{{ suggestion }}</i>
          </span>
        </p>
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
      <v-col cols="12" sm="6" lg="4" v-if="filteredFlags.length === 0">
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
import { levensthein } from '../utils/string';
import { unique } from '../utils/array';

export default {
  name: "AllFlags",
  components: { Flag, IdentityInfo },
  data: () => ({
    flags: Object.keys(flagPresets),
    search: "",
    error: null as string | null,
    regex: false,
    reverse: false,
    lastChosenAlgorithm: 0,
    sortAlgorithms: [
      {
        name: "Alphabetically",
        exec: (flags: string[]) => flags.sort(),
        icon: "mdi-alphabetical-variant",
      },
      {
        name: "Random",
        exec: (flags: string[]) => shuffle(flags, seededRandom(new Date().toUTCString())),
        icon: "mdi-dice-5",
        hideReverse: true,
      },
      {
        name: "Length of name",
        icon: "mdi-arrow-split-vertical",
        exec: (flags: string[]) => flags.sort((a, b) => a.length - b.length)
      },
      {
        name: "Amount of stripes",
        icon: "mdi-texture-box",
        exec: (flags: string[]) =>
          flags.sort((a, b) => flagPresets[a].colors().length - flagPresets[b].colors().length)
      },
      {
        name: "Amount of colors",
        icon: "mdi-palette",
        exec: (flags: string[]) =>
        flags.sort((a, b) => unique(flagPresets[a].colors()).length - unique(flagPresets[b].colors()).length)
      },
    ]
  }),
  computed: {
    improvedSearch() {
      const { search, filteredFlags: flags } = this;

      if (flags.length <= 1) return search;

      let [expandBack, expandForwards] = [true, true];

      let improved = search;

      while (expandBack || expandForwards) {
        for (const name of flags) {
          if (name.startsWith(improved)) expandBack = false;
          if (name.endsWith(improved)) expandForwards = false;
        }

        if (!expandBack && !expandForwards) return improved;

        let charB: string | null = null;
        if (expandBack) {
          for (const name of flags) {
            const index = name.search(improved);
            let thisChar = name.charAt(index - 1);
            if (charB && thisChar != charB) {
              expandBack = false;
              break;
            }
            charB = thisChar;
          }
        }
        if (expandBack) improved = charB + improved;

        let charF: string | null = null;
        if (expandForwards) {
          for (const name of flags) {
            const index = name.search(improved) + improved.length;
            let thisChar = name.charAt(index);
            if (charF && thisChar !== charF) {
              expandForwards = false;
              break;
            }
            charF = thisChar;
          }
        }
        if (expandForwards) improved += charF;
      }
      return improved;
    },
    searchRegex() {
      const search = this.search.trim();
      const { regex } = this;

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
    suggestion(): string | null {
      const { search, flags } = this;
      const sortedByLev = flags
        .map((name: string) => ({
          name,
          lev: levensthein(name.toLowerCase(), search.toLowerCase()) / search.length,
        }))
        .sort((a: { lev: number }, b: { lev: number }) => a.lev - b.lev);

      if (sortedByLev[0].lev > .75) return null;
      return sortedByLev[0].name;
    },
    filteredFlags() {
      return this.flags.filter(this.test);
    },
  },
  created() {
    this.flags = this.flags.sort();

    requestAnimationFrame(() => {
      this.search = this.$route.query.query as string || "";
    })
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
