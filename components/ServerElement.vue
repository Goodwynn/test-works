<template>
  <div v-show="step > 1" ref="serverElement" class="map__element server__element absolute -translate-x-1/2 -translate-y-1/2" :style="{top: position.top, left: position.left}" @click="choose_server">
    <div v-show="step_visibility" class="server__element--svg" />
    <img v-if="serverType === 'main'" src="~/assets/images/server-main.png" alt="Main Server">
    <img v-if="serverType === 'sub'" src="~/assets/images/server-sub.png" alt="Sub Server">
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
    }
  },
  data () {
    return {
      serverType: String
    }
  },
  computed: {
    step_visibility () {
      return this.step > 1 && this.step < 4
    }
  },
  mounted () {
    const serverElSvg = this.$raphael(this.$refs.serverElement.querySelector('.server__element--svg'), 32, 32)
    const rotating = this.$raphael.animation({ transform: 'r360' }, 10000, 'linear').repeat('Infinity')
    const circle = serverElSvg.circle(16, 16, 15)
      .attr({
        'stroke-width': '2',
        'stroke-dasharray': '-',
        stroke: 'white'
      })
    circle.animate(rotating)
    serverElSvg.canvas.className.baseVal = 'server__placeholder'
  },
  methods: {
    choose_server () {
      if (this.step === 2) {
        this.$refs.serverElement.querySelector('.server__placeholder').remove()
        this.$refs.serverElement.style.pointerEvents = 'none'
        this.serverType = 'main'
        this.$emit('chooseserver', {
          name: this.name,
          coords: this.$refs.serverElement.getBoundingClientRect()
        })
      }
      if (this.step === 3) {
        this.$refs.serverElement.querySelector('.server__placeholder').remove()
        this.$refs.serverElement.style.pointerEvents = 'none'
        this.serverType = 'sub'
        this.$emit('chooseserver', {
          name: this.name,
          coords: this.$refs.serverElement.getBoundingClientRect()
        })
      }
    }
  }
}
</script>

<style lang="sass">
  .server
    &__element
      width: 32px
      height: 32px
      border-radius: 50%
      cursor: pointer
      &:hover
        background-color: white
</style>
