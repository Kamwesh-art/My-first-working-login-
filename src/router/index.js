import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Possessions from '@/views/possessions.vue'
import Tasks from '@/views/tasks.vue' 
import profile from '@/views/profile.vue' 
import Profile from '../views/profile.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/possessions',
    name: 'possessions',
    component: Possessions,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router 
