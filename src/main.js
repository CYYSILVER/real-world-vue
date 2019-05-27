import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import upperFirst from 'lodash/fp/upperFirst'
import camelCase from 'lodash/fp/camelCase'
import 'nprogress/nprogress.css'
import Vuelidate from 'vuelidate'
import DateFilter from '@/filters/date'

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

// webpack function
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

