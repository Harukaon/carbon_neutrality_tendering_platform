import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/bids',
    name: 'Bids',
    component: () => import('@/views/Bids/Bids.vue')
  },
  {
    path: '/bids/detail/:id',
    name: 'BidDetail',
    component: () => import('@/views/Bids/components/BidsDetail.vue')
  },
  {
    path: '/announcement/:id',
    name: 'AnnouncementDetail',
    component: () => import('@/views/home/components/AnnouncementList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 