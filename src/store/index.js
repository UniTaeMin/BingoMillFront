import Vue from 'vue'
import Vuex from 'vuex'

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
          .post("", data)
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
