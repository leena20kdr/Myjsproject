import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/produits-et-services',
      name: 'produits',
      component: () => import('../views/ProduitsEtServices.vue'),
    },
    {
      path: '/secteurs-dactivites',
      name: 'secteurs',
      component: () => import('../views/SecteursActivites.vue'),
    },
    {
      path: '/actualites',
      name: 'actualites',
      component: () => import('../views/Actualites.vue'),
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/Clients.vue'),
    },
    {
      path: '/a-propos',
      name: 'apropos',
      component: () => import('../views/APropos.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/Contacts.vue'),
    },
  ],
})

export default router
