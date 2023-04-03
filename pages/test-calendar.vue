<template>
  <div class="bg-black min-h-screen text-white p-4">
    <section class="container mx-auto">
      <div class="calendar">
        <div class="calendar__header flex justify-between items-center mb-2">
          <h1 class="month__title">
            {{ getCurentMonthALabel }}
          </h1>
          <div class="month__control">
            <button
              class="month__prev p-2 bg-green-500"
              :disabled="!buttonPrevActive"
              @click="currentMonth--"
            >
              &#60;
            </button>
            <button
              class="month__next p-2 bg-green-500"
              :disabled="!buttonNextActive"
              @click="currentMonth++"
            >
              &#62;
            </button>
          </div>
        </div>
        <DateMonthNew
          v-for="month in 12"
          :key="'month-' + month"
          :month="month"
          :current-month="currentMonth"
          :days-label="getDaysLabel"
          :year="year"
          :events="events"
        />
      </div>
    </section>
  </div>
</template>

<script>
import locale from 'date-fns/esm/locale/uk'
export default {
  data () {
    return {
      currentMonth: 1,
      year: 2023,
      events: [
        {
          day: new Date(2023, 2, 26),
          start: {
            hour: 14,
            minute: 0,
            second: 0
          },
          end: {
            hour: 15,
            minute: 0,
            second: 0
          }
        }
      ]
    }
  },
  computed: {
    getCurentMonthALabel () {
      const objDate = new Date(this.year, this.currentMonth, 0)
      return objDate.toLocaleString('uk-UA', { month: 'long' })
    },
    getDaysLabel () {
      return [...Array(7).keys()].map(i => locale.localize.day(i !== 6 ? i + 1 : 0, { width: 'short' }))
    },
    buttonNextActive () {
      return this.currentMonth < 12
    },
    buttonPrevActive () {
      return this.currentMonth > 1
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">
  .month
    &__title::first-letter
      text-transform: capitalize
</style>
