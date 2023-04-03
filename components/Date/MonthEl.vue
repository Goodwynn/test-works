<template>
  <table v-if="getDayInMonth !== 0" class="month__container table-fixed border border-white">
    <thead>
      <tr>
        <th>Пн</th>
        <th>Вт</th>
        <th>Ср</th>
        <th>Чт</th>
        <th>Пт</th>
        <th>Сб</th>
        <th>Нд</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, index) in weeks" :key="month + '-week-' + index">
        <DateDayEl
          v-for="i in 7"
          :key="i"
          :week="week"
          :day-number="i"
          :events="events"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 2023
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      weeks: []
    }
  },
  computed: {
    getDayInMonth () {
      return new Date(this.year, this.month, 0).getDate()
    }
  },
  mounted () {
    this.getDayInWeek()
  },
  methods: {
    getDayInWeek () {
      let week = []
      for (let i = 1; i <= this.getDayInMonth; i++) {
        const day = new Date(this.year, this.month - 1, i)
        let dayCount = day.getDay()
        if (dayCount === 0) {
          dayCount = 7
        }
        const dayObj = {
          weekDay: dayCount,
          monthDay: i,
          fullDate: day
        }
        week.push(dayObj)
        if ((dayCount % 7 === 0) || (i === this.getDayInMonth)) {
          this.weeks.push(week)
          week = []
        }
      }
    }
  }
}
</script>

<style lang="sass">
  .month
    &__container
      width: 100%
      tr
        border-bottom: 1px solid white
      th, td
        height: 100%
        &:not(:last-child)
          border-right: 1px solid white
</style>
