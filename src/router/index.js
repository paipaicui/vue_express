import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = file => require('../view/' + file + '.vue').default

const globalRoutes = [{
    path: '/404',
    component: _import('404'),
    name: '404',
    meta: {
      title: '404'
    }
  },
  {
    path: '/login',
    component: _import('login'),
    name: 'login',
    meta: {
      title: '登录页'
    }
  },
]

const router = new Router({
  isAdd: false, //是否已经添加动态(菜单)路由
  routes: globalRoutes
})


export default router
