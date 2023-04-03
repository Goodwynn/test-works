<template>
  <td>
    <span class="day__data relative flex items-center justify-center" :class="{ 'opacity-25': !checkMonth, 'bg-green-900': Object.keys(checkEvent).length !== 0 }">
      {{ day.getDate() }}
      <span v-if="Object.keys(checkEvent).length !== 0" class="event__data absolute top-full w-full text-center bg-green-900 z-10">
        {{ checkEvent.eventStart }} -
        {{ checkEvent.eventEnd }}
      </span>
    </span>
  </td>
</template>

<script>
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

export default {
  props: {
    day: {
      type: Date,
      default: 0
    },
    currentMonth: {
      type: Number,
      default: 0
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    checkMonth () {
      return this.currentMonth === this.day.getMonth() + 1
    },
    checkEvent () {
      const result = {}
      const event = this.events.find(ev => ev.day.toLocaleString('uk-UA') === this.day.toLocaleString('uk-UA'))
      if (event) {
        const eventStart = zonedTimeToUtc(new Date(this.day.setHours(event.start.hour, event.start.minute, event.start.second)), 'Europe/Kyiv')
        const eventEnd = zonedTimeToUtc(new Date(this.day.setHours(event.end.hour, event.end.minute, event.end.second)), 'Europe/Kyiv')
        const zonedStart = utcToZonedTime(eventStart, 'Europe/London')
        const zonedEnd = utcToZonedTime(eventEnd, 'Europe/London')
        result.eventStart = zonedStart.toLocaleTimeString('uk-UA')
        result.eventEnd = zonedEnd.toLocaleTimeString('uk-UA')
      }
      return result
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
</style>
