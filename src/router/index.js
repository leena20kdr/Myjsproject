import { createRouter, createWebHistory } from 'vue-router'
import Page from '@/pages/Page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Page,
    props: { slug: 'accueil' } // ⚡ ici tu mets le slug de ta page d'accueil WordPress
  },
  {
    path: '/:slug',
    name: 'page',
    component: Page,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
  