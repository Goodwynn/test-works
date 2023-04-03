<template>
  <p v-if="$fetchState.pending">
    Fetching mountains...
  </p>
  <div v-else class="bg-black min-h-screen text-white p-4">
    <section class="container mx-auto mb-4">
      <div class="controls flex items-center justify-between">
        <fieldset class="flex flex-col gap-2">
          <label for="country-select">
            Выберите страну
          </label>
          <select id="county-select" v-model="selectedCountry" name="country-select" class="text-black">
            <option value="All">
              All
            </option>
            <option v-for="country in countryList" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
        </fieldset>
        <fieldset class="flex flex-col gap-2">
          <label for="cat-select">Выберите рубрику</label>
          <select id="cat-select" v-model="selectedCat" name="cat-select" class="text-black">
            <option value="All">
              All
            </option>
            <option v-for="cat in catList" :key="cat.id" :value="cat.id" :disabled="!showedCat.includes(cat.id)">
              {{ cat.name }}
            </option>
          </select>
        </fieldset>
      </div>
    </section>
    <section class="container mx-auto">
      <ul class="grid grid-cols-6 grid-rows-3 gap-4">
        <li v-for="page in paginatedData" :key="page.name" class="bg-zinc-400 p-2 rounded-xl">
          <nuxt-link :to="{path: 'tv-list/' + page.name}">
            <img :src="page.logo" :alt="page.name" class="max-w-full w-full aspect-square object-contain object-center">
          </nuxt-link>
        </li>
      </ul>
      <nav class="flex items-center justify-center gap-4 my-4">
        <button
          :disabled="buttonPrevActive"
          :class="buttonPrevActive ? 'opacity-25' : 'opacity-100'"
          @click="prevPage"
        >
          Previous
        </button>
        <ul class="flex flex-wrap items-center justify-center gap-4">
          <li v-for="page in pageCount" :key="page">
            <button
              :class="pageNumber === page - 1 ? 'text-green-600' : 'text-white'"
              @click="setPage(page)"
            >
              {{ page }}
            </button>
          </li>
        </ul>
        <button
          :disabled="buttonNextActive"
          :class="buttonNextActive ? 'opacity-25' : 'opacity-100'"
          @click="nextPage"
        >
          Next
        </button>
      </nav>
    </section>
  </div>
</template>

<script>
// import parser from 'iptv-playlist-parser'
export default {
  data () {
    return {
      channelsList: [],
      streamsList: [],
      countryList: [],
      catList: [],
      pageNumber: 0,
      size: 18,
      selectedCountry: 'All',
      selectedCat: 'All'
    }
  },
  async fetch () {
    this.channelsList = await this.$axios.$get('https://iptv-org.github.io/api/channels.json').then(res => res.filter(item => !item.closed))
    this.streamsList = await this.$axios.$get('https://iptv-org.github.io/api/streams.json')
    this.countryList = await this.$axios.$get('https://iptv-org.github.io/api/countries.json')
    this.catList = await this.$axios.$get('https://iptv-org.github.io/api/categories.json')
  },
  computed: {
    showedList () {
      let result = this.channelsList

      if (this.selectedCountry !== 'All') {
        const countryFilter = result.filter(item => item.country === this.selectedCountry)
        result = countryFilter
      }

      if (this.selectedCat !== 'All') {
        const catFilter = result.filter(item => item.categories.find(item => item === this.selectedCat))
        result = catFilter
      }
      return result
    },
    showedCat () {
      const arr = []

      if (this.selectedCountry === 'All') {
        this.channelsList.forEach((el) => {
          el.categories.forEach((cat) => {
            arr.push(cat)
          })
        })
      }

      if (this.selectedCountry !== 'All') {
        const country = this.channelsList.filter(item => item.country === this.selectedCountry)
        country.forEach((el) => {
          el.categories.forEach((cat) => {
            arr.push(cat)
          })
        })
      }

      return Array.from(new Set(arr))
    },
    pageCount () {
      return Math.ceil(this.showedList.length / this.size)
    },
    paginatedData () {
      const start = this.pageNumber * this.size
      const end = start + this.size
      return this.showedList.slice(start, end)
    },
    buttonNextActive () {
      return this.pageNumber === this.pageCount - 1
    },
    buttonPrevActive () {
      return this.pageNumber === 0
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    },
    setPage (number) {
      this.pageNumber = number - 1
    }
  }
  // async asyncData ({ $axios }) {
  //   const playlist = await $axios.$get('https://iptv-org.github.io/iptv/languages/rus.m3u')
  //   return { playlist }
  // },
  // mounted () {
  //   const result = parser.parse(this.playlist)
  //   const filterList = result.items.filter(item => item.group.title === 'News')
  //   console.log(filterList)
  // }
}
</script>

<style lang="sass">
  .controls
    +fz-adapt(16, 24)
</style>
