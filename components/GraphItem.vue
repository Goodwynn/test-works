<template>
  <div class="grid grid-rows-6 gap-4 h-screen md:grid-cols-12 md:grid-rows-none md:h-auto md:items-center">
    <div class="order-1 row-span-1 md:order-none md:col-span-2 md:row-auto">
      <div class="flex flex-col-reverse gap-4 items-center justify-between md:flex-row">
        <div>
          <span class="block text-xs text-center break-all md:text-base">
            {{ name }}
          </span>
          <div v-if="price_type === 'object'" class="flex flex-wrap md:flex-col gap-2 mt-2">
            <div v-for="(item, index) in storagePrice" :key="index" ref="priceInput">
              <input
                type="radio"
                :id=item.priceLabel
                :name=item.priceLabel
                :value=item.priceValue
                v-model=currentStoragePrice
              >
              <label :for=item.priceLabel>{{ item.priceLabel }}</label>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <img :src="icon" :alt="name">
        </div>
      </div>
    </div>
    <div class="graph__bar flex flex-col-reverse items-center gap-4 row-span-5 md:row-auto md:col-span-10 md:flex-row">
      <span class="graph__fill" :style="{width: graph_width, height: graph_height, backgroundColor: graph_color}"></span>
      <span class="graph__tooltip">{{ provider_price }}$</span>
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
    icon: {
      type: String,
      default: ''
    },
    minPay: {
      type: Number,
      default: 0
    },
    maxPay: {
      type: Number,
      default: 0
    },
    storageValue: {
      type: Number,
      default: 0
    },
    storagePrice: {
      type: null,
      default: 0
    },
    transferValue: {
      type: Number,
      default: 0
    },
    transferPrice: {
      type: Number,
      default: 0
    },
    freeLimit: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'gray'
    },
    maxPriceValue: {
      type: Number,
      default: 0
    },
    minPriceValue: {
      type: Number,
      default: 0
    },
    screenWidth: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentStoragePrice: 0
    }
  },
  mounted () {
    this.check_first_el()
    this.$emit('calcmaxprice', {
      value: this.max_provider_price()
    })
  },
  computed: {
    provider_price () {
      let result
      let calcPrice

      if (this.freeLimit !== 0) {
        const calcStorage = this.storageValue < this.freeLimit ? 0 : (this.storageValue - this.freeLimit) * this.currentStoragePrice
        const calcTransfer = this.transferValue < this.freeLimit ? 0 : (this.transferValue - this.freeLimit) * this.transferPrice

        calcPrice = calcStorage + calcTransfer
      }

      if (this.freeLimit === 0) {
        calcPrice = this.storageValue * this.currentStoragePrice + this.transferValue * this.transferPrice
      }

      if (this.minPay !== 0) {
        result = this.minPay > calcPrice ? this.minPay.toFixed(2) : calcPrice.toFixed(2)
      }

      if (this.maxPay !== 0) {
        result = this.maxPay > calcPrice ? calcPrice.toFixed(2) : this.maxPay.toFixed(2)
      }

      if (this.minPay === 0 && this.maxPay === 0) {
        result = calcPrice.toFixed(2)
      }

      return result
    },
    price_type () {
      return typeof (this.storagePrice)
    },
    graph_width () {
      let result
      const percent = this.provider_price * 100 / this.maxPriceValue
      if (this.screenWidth < 768) {
        result = 100 + '%'
      }
      if (this.screenWidth >= 768) {
        result = percent < 0.1 ? 0.1 + '%' : percent + '%'
      }
      return result
    },
    graph_height () {
      let result
      const percent = this.provider_price * 100 / this.maxPriceValue
      if (this.screenWidth < 768) {
        result = percent < 0.1 ? 0.1 + '%' : percent + '%'
      }
      if (this.screenWidth >= 768) {
        result = 100 + 'px'
      }
      return result
    },
    graph_color () {
      let color
      if (this.minPriceValue.toFixed(2) === this.provider_price) {
        color = this.color
      }
      if (this.minPriceValue.toFixed(2) !== this.provider_price) {
        color = 'gray'
      }
      return color
    }
  },
  methods: {
    check_first_el () {
      if (this.price_type === 'object') {
        this.currentStoragePrice = this.storagePrice[0].priceValue
      }
      if (this.price_type !== 'object') {
        this.currentStoragePrice = this.storagePrice
      }
    },

    max_provider_price () {
      let result = 0

      if (this.price_type === 'object') {
        this.storagePrice.forEach((el) => {
          let elValue

          if (this.freeLimit !== 0) {
            elValue = (1000 - this.freeLimit) * el.priceValue + (1000 - this.freeLimit) * this.transferPrice
          }

          if (this.freeLimit === 0) {
            elValue = 1000 * el.priceValue + 1000 * this.transferPrice
          }

          if (elValue > result) {
            result = elValue
          }
        })
      }

      if (this.price_type !== 'object') {
        if (this.freeLimit !== 0) {
          result = (1000 - this.freeLimit) * this.storagePrice + (1000 - this.freeLimit) * this.transferPrice
        }

        if (this.freeLimit === 0) {
          result = 1000 * this.storagePrice + 1000 * this.transferPrice
        }
      }

      return result
    }
  },
  watch: {
    provider_price (oldValue, newValue) {
      this.$emit('providerprice', {
        value: this.provider_price
      })
    }
  }
}
</script>

<style lang="sass">
  .graph
    &__fill
      display: block
</style>
