<template>
  <div class="bg-black min-h-screen text-white p-4">
    <section class="container mx-auto">

    </section>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  async asyncData ({ $axios }) {
  }
}
</script>

<style lang="sass">

</style>
