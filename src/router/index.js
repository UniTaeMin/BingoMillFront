import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/museum',
    name: 'Museum',
    component: () => import('../views/Museum.vue')
  },
  {
    path: '/museum/:_id',
    name: 'MuseumList',
    component: () => import('../views/MuseumList.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
