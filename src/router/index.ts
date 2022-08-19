import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Wait from '../views/wait/index.vue'
import BuilderView from '@/views/builderView/index.vue'
import AntV from '@/views/antv/index.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
