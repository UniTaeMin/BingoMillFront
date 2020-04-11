import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Sortable from 'vue-sortable'
import VueHtml2Canvas from 'vue-html2canvas';
import { firestorePlugin } from 'vuefire'
import 'babel-polyfill'; //add this line

Vue.use(firestorePlugin)
Vue.use(Sortable)
Vue.use(VueHtml2Canvas);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
