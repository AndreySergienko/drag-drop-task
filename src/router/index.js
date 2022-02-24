import { createRouter, createWebHistory } from 'vue-router'
import Cards from '../views/Cards.vue'

const routes = [
  {
    path: '/',
    name: 'cards',
    component: Cards
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateCards.vue')
  },
  {
    path: '/:notFound(.*)',
    redirect: {name: 'cards'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
