<template>
  <div class="map__element levels__element absolute p-2 -translate-x-1/2 -translate-y-1/2" :style="{top: position.top, left: position.left}">
    <span v-show="ping !== 0" class="absolute bg-black p-2" style="top: 0%; left: 0; transform: translateY(-100%)">
      {{ ping + 'ms' }}
    </span>
    <div v-if="level_choose_visibility && step_visibility" class="levels__container flex flex-row-reverse items-end gap-2">
      <div class="levels__radio">
        <input
          :id="'level-' + name + '-3'"
          v-model="level"
          type="radio"
          :name="'level-' + name"
          value="3"
          @change="choose_level"
        >
        <label :for="'level-' + name + '-3'" class="levels__icon levels__icon--large">
          <SvgIcon name="person-2" />
        </label>
      </div>
      <div class="levels__radio">
        <input
          :id="'level-' + name + '-2'"
          v-model="level"
          type="radio"
          :name="'level-' + name"
          value="2"
          @change="choose_level"
        >
        <label :for="'level-' + name + '-2'" class="levels__icon levels__icon--medium">
          <SvgIcon name="person-2" />
        </label>
      </div>
      <div class="levels__radio">
        <input
          :id="'level-' + name + '-1'"
          v-model="level"
          type="radio"
          :name="'level-' + name"
          value="1"
          @change="choose_level"
        >
        <label :for="'level-' + name + '-1'" class="levels__icon levels__icon--small">
          <SvgIcon name="person-2" />
        </label>
      </div>
    </div>
    <div v-show="!level_choose_visibility" ref="levelsIcons" class="levels__container flex flex-col gap-4 align-center">
      <div v-show="level >= 1" class="relative">
        <img src="~/assets/images/small.png" alt="small" class="w-8">
        <div class="download__progress" style="width: 0px; height: 15px; top: 7px; left: 4px" data-width="24" />
      </div>
      <div v-show="level >= 2" class="relative">
        <img src="~/assets/images/medium.png" alt="medium" class="w-8">
        <div class="download__progress" style="width: 0px; height: 22px; top: 5px; left: 8px" data-width="16" />
      </div>
      <div v-show="level >= 3" class="relative">
        <img src="~/assets/images/large.png" alt="large" class="w-8">
        <div class="download__progress" style="width: 0px; height: 6px; top: 9px; left: 11px" data-width="11" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    position: {
      type: Object,
      default: () => {}
    },
    step: {
      type: Number,
      default: 0
    },
    ping: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      level: 0,
      coords: []
    }
  },
  computed: {
    level_choose_visibility () {
      return this.level < 1
    },
    step_visibility () {
      return this.step < 2
    }
  },
  methods: {
    async choose_level () {
      await this.$nextTick()
      this.$emit('chooselevel', {
        name: this.name,
        level: parseInt(this.level),
        coords: this.coords
      })
      this.$refs.levelsIcons.querySelectorAll('img').forEach((icon, index) => {
        if (this.level >= index + 1) {
          this.coords.push(icon.getBoundingClientRect())
        }
      })
    },
    progress_width () {
      this.$refs.levelsIcons.querySelectorAll('.download__progress').forEach((bar) => {
        bar.style.width = bar.dataset.width + 'px'
        bar.style.transitionDuration = (this.ping * 10) + 'ms'
      })
    },
    progress_reset () {
      this.$refs.levelsIcons.querySelectorAll('.download__progress').forEach((bar) => {
        bar.style.transitionDuration = 0 + 'ms'
        bar.style.width = 0
      })
    }
  },
  watch: {
    ping () {
      this.progress_reset()
      setTimeout(() => {
        this.progress_width()
      }, 100)
    }
  }
}
</script>

<style lang="sass">
  .levels
    &__radio
      label
        cursor: pointer
      input
        display: none
    &__icon
      display: block
      &--small
        svg
          width: 16px
          height: 16px
      &--medium
        svg
          width: 16px
          height: 24px
      &--large
        svg
          width: 16px
          height: 32px
      svg
        fill: white

  .levels__radio:hover,
  .levels__radio:hover ~ .levels__radio
    label
      svg
        fill: blue

  .download__progress
    position: absolute
    border-radius: 2px
    background-color: rgba(blue, .7)
</style>
