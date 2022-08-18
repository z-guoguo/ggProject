import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/builderView/wait/index.vue'
import BuilderView from '@/views/builderView/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'mainView',//开发中。。。 显示页面
    component: Home
  },
  {
    path: '/builder',
    name: 'builderView',
    component: BuilderView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
