<template>
  <table v-if="month === currentMonth" class="month w-full table-fixed border border-white">
    <thead>
      <tr>
        <th v-for="dayLabel in daysLabel" :key="dayLabel">
          {{ dayLabel }}
        </th>
      </tr>
    </thead>
    <tbody>
      <DateWeekEl
        v-for="(week, index) in getWeeksInMonth"
        :key="'week-' + index"
        :week="week"
        :month="month"
        :current-month="currentMonth"
        :year="year"
        :events="events"
      />
    </tbody>
  </table>
</template>

<script>
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    currentMonth: {
      type: Number,
      default: 0
    },
    daysLabel: {
      type: Array,
      default: () => []
    },
    year: {
      type: Number,
      default: 0
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getWeeksInMonth () {
      return getWeeksInMonth(new Date(this.year, this.month - 1, 1), { weekStartsOn: 1 })
    }
  }
}
</script>

<style lang="sass">
  .month
    tr
      border-bottom: 1px solid white
    th, td
      height: 100%
      &::first-letter
        text-transform: capitalize
      &:not(:last-child)
        border-right: 1px solid white
</style>
