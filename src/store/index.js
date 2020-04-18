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
          .post("https://www.taemin.dev/bingo/post/create", data)
          .then(value => {
            resolve(value);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    FindAll({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://www.taemin.dev/bingo/post/findall")
          .then(value => {
            resolve(value);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    FindOne({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://www.taemin.dev/bingo/post/findone", data)
          .then(value => {
            resolve(value);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    Delete({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete("https://www.taemin.dev/bingo/post/delete", { data: data })
          .then(value => {
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
