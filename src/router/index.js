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
    component: () => import('../views/Museum.vue'),
    children: [
      {
        path: "",
        name: "",
        component: () => import("../views/Museum/Lists.vue"),
      },
      {
        path: ':_id',
        name: 'MuseumList',
        component: () => import('../views/Museum/Info.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
