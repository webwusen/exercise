import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  },
  {
    path: 'canvas',
    redirect: '/canvas/particle',
    name: 'Canvas',
    component: () => import('@/pages/canvas/index.vue'),
    children: [
      {
        path: 'particle',
        name: 'Particle',
        component: () => import('@/pages/canvas/particle/index.vue')
      },
      {
        path: 'dragon',
        name: 'Dragon',
        component: () => import('@/pages/canvas/dragon/index.vue')
      },
      {
        path: 'snake',
        name: 'Snake',
        component: () => import('@/pages/canvas/gluttonous-snake/index.vue')
      },
      {
        path: 'drop',
        name: 'Drop',
        component: () => import('@/pages/canvas/drop-demo/index.vue')
      }
    ]
  },
  {
    path: 'css3',
    redirect: '/css3/skybox',
    name: 'Css3',
    component: () => import('@/pages/css3/index.vue'),
    children: [
      {
        path: 'skyBox',
        name: 'SkyBox',
        component: () => import('@/pages/css3/sky-box/index.vue')
      },
      {
        path: 'mazeBoard',
        name: 'MazeBoard',
        component: () => import('@/pages/css3/maze-board/index.vue')
      },
      {
        path: 'starrySky',
        name: 'StarrySky',
        component: () => import('@/pages/css3/starry-sky/index.vue')
      },
      {
        path: 'filterContrast',
        name: 'FilterContrast',
        component: () => import('@/pages/css3/filter-contrast/index.vue')
      },
      {
        path: 'dragonBoatFestival',
        name: 'DragonBoatFestival',
        component: () => import('@/pages/css3/dragon-boat-festival/index.vue')
      }
    ]
  },
  {
    path: 'threeJs',
    name: 'ThreeJs',
    component: () => import('@/pages/threeJs/index.vue'),
    children: [
      {
        path: 'car',
        name: 'Car',
        component: () => import('@/pages/threeJs/three-car/index.vue')
      }
    ]
  },
  {
    path: 'goJS',
    name: 'Gojs',
    component: () => import('@/pages/goJS/index.vue')
  }
]
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: () => import('@/pages/home/index.vue'),
    children: baseRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
