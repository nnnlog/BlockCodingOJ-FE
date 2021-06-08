import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Problem from '../views/Problem.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/problem/:id',
    name: 'Problem',
    component: Problem
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
