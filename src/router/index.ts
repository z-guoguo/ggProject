import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Wait from '../views/wait/index.vue'
import BuilderView from '@/views/builderView/index.vue'
import AntV from '@/views/antv/index.vue'
import AntX from '@/views/antx/index.vue'
import Personalise from '@/views/personalise/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'mainView',//开发中。。。 显示页面
    component: Wait
  },
  {
    path: '/builder',
    name: 'builderView',
    component: BuilderView
  },
  {
    path: '/G6',
    name: 'antV',
    component: AntV
    // component: (resolve) => require(['@/views/antv/index.vue'],resolve)
  },
  {
    path: '/X6',
    name: 'antX',
    component: AntX
    // component: (resolve) => require(['@/views/antx/index.vue'],resolve)
  },
  // =========================================个性化
  {
    path: '/personalise',
    name: 'personaLise',
    component: Personalise
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
