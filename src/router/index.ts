import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      key: '/dashboard'
    }
  },
  {
    path: '/car',
    name: 'Car',
    component: () => import('@/pages/three-car/index.vue'),
    meta: {
      key: '/car'
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
  },
  {
    path: '/css3',
    redirect: '/css3/skybox',
    name: 'Css3',
    component: () => import('@/pages/css3/index.vue'),
    meta: {
      key: '/css3'
    },
    children: [
      {
        path: '/css3/skybox',
        name: 'SkyBox',
        component: () => import('@/pages/css3/sky-box/index.vue'),
        meta: {
          key: '/css3/skybox'
        }
      },
      {
        path: '/css3/mazeboard',
        name: 'MazeBoard',
        component: () => import('@/pages/css3/maze-board/index.vue'),
        meta: {
          key: '/css3/mazeboard'
        }
      }
    ]
  },
  {
    path: '/goJS',
    name: 'Gojs',
    component: () => import('@/pages/goJS/index.vue'),
    meta: {
      key: '/goJS'
    }
  }
]
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      key: '/'
    },
    children: baseRoutes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
