<template>
  <tr>
    <DateDayNew
      v-for="day in getDaysInWeek"
      :key="'day-' + day.getDay()"
      :day="day"
      :current-month="currentMonth"
      :events="events"
    />
  </tr>
</template>

<script>
import endOfWeek from 'date-fns/endOfWeek'
import startOfWeek from 'date-fns/startOfWeek'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
export default {
  props: {
    week: {
      type: Number,
      default: 1
    },
    month: {
      type: Number,
      default: 0
    },
    currentMonth: {
      type: Number,
      default: 0
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
    getDaysInWeek () {
      const firstDay = 1 + ((this.week - 1) * 7)
      const weekStart = startOfWeek(new Date(this.year, this.month - 1, firstDay), { weekStartsOn: 1 })
      const weekEnd = endOfWeek(new Date(this.year, this.month - 1, firstDay), { weekStartsOn: 1 })
      const week = eachDayOfInterval({
        start: weekStart,
        end: weekEnd
      })
      return week
    }
  }
}
</script>

<style lang="sass">
</style>
