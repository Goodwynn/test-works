import Vue from 'vue'
import Raphael from 'raphael/raphael'
Vue.use({
  install (Vue) {
    Vue.Raphael = Raphael
    Vue.prototype.$raphael = Raphael
  }
})
