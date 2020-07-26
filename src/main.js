import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import { OvermindPlugin } from './overmind'
import Fragment from 'vue-fragment'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/tailwind.css'


Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(OvermindPlugin, ({ state, actions, effects }) => ({
  user: state.user,
  actions,
  effects
}))
Vue.use(Fragment.Plugin)
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
