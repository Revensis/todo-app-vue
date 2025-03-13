import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Tasks from '@/views/Task.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
