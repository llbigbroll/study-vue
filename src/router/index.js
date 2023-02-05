import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  // default page
  {path: '/', name: 'home', component: HomeView},
  // etc page
  {path: '/about', name: 'about', component: AboutView},
  {path: '/user', name: 'user', component: UserView},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
