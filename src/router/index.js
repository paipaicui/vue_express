import Vue from 'vue'
import Router from 'vue-router'
import $ from 'axios'
import {
  json
} from 'body-parser'

Vue.use(Router)

const commonRoutes = [{
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../view/login.vue'),
  },
  {
    path: '/link1', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
    name: 'path1',
    meta: {
      title: '单独的路由'
    },
    component: () => import('../view/link1.vue'),
    children: [{
      path: '/link1/page3',
      name: 'page33',
      meta: {
        title: '登录'
      },
      component: () => import('../view/page3.vue'),
    }]
  },
  {
    path: '/',
    redirect: '/login'
  },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
const createRouter = () => new Router({
  routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}


function createRoutes(data) {

  const result = []

  data.forEach(item => {
    result.push({
      path: item.path, // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
      meta: {
        title: item.title
      },
      component: () => import('../view/' + item.components + '.vue'),
      //children: createRoutes(item.children)
    })


  })

  return result;
}

if (sessionStorage.getItem('router')) {

  router.addRoutes(JSON.parse(sessionStorage.getItem('router')));
} else {
  router.beforeEach(async (to, from, next) => {
    $.get('/admin/users').then(res => {
      const routes = createRoutes(res.data);
      sessionStorage.setItem('router', JSON.stringify(routes));
      router.addRoutes(routes);

    })
    next();

  })

}



export default router
