import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Possessions from '@/views/possessions.vue'
import Tasks from '@/views/tasks.vue' 
import Checkin from '@/views/checkin.vue' 
import Profile from '../views/profile.vue'
import Reports from '@/views/reports.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
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
  },
  {
    path: '/checkin',
    name: 'checkin',
    component: Checkin,
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router 
