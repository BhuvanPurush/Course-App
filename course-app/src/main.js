import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
