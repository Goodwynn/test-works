<template>
  <td class="relative">
    <span v-for="day in week" :key="day.monthDay">
      <span
        v-if="day.weekDay === dayNumber"
        class="day__data flex flex-col items-center"
        :class="checkEvent(day) ? 'bg-green-900 pointer' : ''"
      >
        {{ day.monthDay }}
        <div
          v-if="day.eventStart || day.eventEnd"
          class="event__data absolute p-2 bg-green-900"
        >
          <span>
            {{ day.eventStart.toLocaleTimeString('uk-UA') }} -
          </span>
          <span>
            {{ day.eventEnd.toLocaleTimeString('uk-UA') }}
          </span>
        </div>
      </span>
    </span>
  </td>
</template>

<script>
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

export default {
  props: {
    week: {
      type: Array,
      default: () => []
    },
    dayNumber: {
      type: Number,
      default: 0
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    checkEvent (date) {
      const result = this.events.find(item => item.day.toLocaleString('ru-RU') === date.fullDate.toLocaleString('ru-RU'))
      if (result !== undefined) {
        this.getEventTime(date, result)
      }
      return result
    },
    getEventTime (date, ev) {
      const eventStart = zonedTimeToUtc(new Date(date.fullDate.setHours(ev.start[0], ev.start[1], ev.start[2])), 'Europe/Kyiv')
      const eventEnd = zonedTimeToUtc(new Date(date.fullDate.setHours(ev.end[0], ev.end[1], ev.end[2])), 'Europe/Kyiv')
      const zonedStart = utcToZonedTime(eventStart, 'Europe/London')
      const zonedEnd = utcToZonedTime(eventEnd, 'Europe/London')
      date.eventStart = zonedStart
      date.eventEnd = zonedEnd
    }
  }
}
</script>

<style lang="sass">
  .day__data,
  .event__data
    &:hover
      .event__data
        display: block
  .event__data
    display: none
    z-index: 2
    top: calc( 100% - 2px )
    left: 0
    width: 100%
    text-align: center
</style>
