import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    UpLoad({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:4000/post/create", data)
          .then(value => {
            console.log(value);
            resolve(value);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
  modules: {
  }
})
