import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      key: '/'
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          key: '/dashboard'
        }
      },
      {
        path: '/threeCar',
        name: 'ThreeCar',
        component: () => import('@/pages/threeCar/index.vue'),
        meta: {
          key: '/threeCar'
        }
      },
      {
        path: '/dragon',
        name: 'Dragon',
        component: () => import('@/pages/dragon/index.vue'),
        meta: {
          key: '/dragon'
        }
      },
      {
        path: '/snake',
        name: 'Snake',
        component: () => import('@/pages/gluttonous-snake/index.vue'),
        meta: {
          key: '/snake'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
