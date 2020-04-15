import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Sortable from 'vue-sortable'
import VueHtml2Canvas from 'vue-html2canvas';
import 'babel-polyfill'; //add this line
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
Vue.use(Sortable)
Vue.use(VueHtml2Canvas);
Vue.use(Toasted)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')