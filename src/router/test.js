const _import = file => require('../pages/' + file + '.vue').default
//全局路由(无需嵌套)
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
//主入口路由(需嵌套整体布局页面)
const mainRoutes = {
  path: '/',
  component: _import('index'),
  name: 'index',
  children: []
}
//实例化
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  isAdd: false, //是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})
router.beforeEach((to, from, next) => { //添加动态(菜单)路由
  if (router.options.isAdd || isGlobalRoutes(to)) { //判断是否已经添加动态路由,或者当前为全局路由的时候。 直接访问
    next()
  } else {
    const menus = [ //测试-数据 typ[0上级菜单，1页面菜单，2页面功能]，这里是http请求后端接口获取数据路由数据。
      {
        id: 1,
        parentId: 0,
        name: "系统管理",
        url: "sys",
        type: 0
      },
      {
        id: 2,
        parentId: 1,
        name: "账号管理",
        url: "sys/account",
        type: 1
      },
      {
        id: 3,
        parentId: 1,
        name: "菜单管理",
        url: "sys/menu",
        type: 1
      },
      {
        id: 4,
        parentId: 1,
        name: "角色管理",
        url: "sys/role",
        type: 1
      },
      {
        id: 5,
        parentId: 0,
        name: "数据管理",
        url: "data",
        type: 0
      },
      {
        id: 6,
        parentId: 5,
        name: "用户管理",
        url: "data/user",
        type: 1
      },
      {
        id: 7,
        parentId: 0,
        name: "审核管理",
        url: "examine",
        type: 0
      },
      {
        id: 8,
        parentId: 7,
        name: "短视频审核",
        url: "examine/video",
        type: 1
      },
      {
        id: 9,
        parentId: 7,
        name: "相册审核",
        url: "examine/photos",
        type: 1
      },
    ]
    sessionStorage.setItem('menus', JSON.stringify(menus || '[]')) //存储动态路由,或者使用vuex。以便后面需要。
    addDynamicMenu(menus)
    next({
      ...to,
      replace: true
    })
  }
})
//判断当前是否全局路由
function isGlobalRoutes(to) {
  for (let i in globalRoutes) {
    if (globalRoutes[i].path == to.path) {
      return true;
    }
  }
  return false;
}
//添加动态(菜单)路， 参数menu：菜单列表
function addDynamicMenu(menu = []) {
  var routes = []
  for (let i in menu) {
    if (menu[i].type == 1) {
      var route = {
        path: menu[i].url,
        component: _import(menu[i].url),
        name: menu[i].name,
      } //菜单管理
      routes.push(route)
    }
  }
  mainRoutes.children = routes
  router.addRoutes([ //vue-routers2.2版本以上才支持。
    mainRoutes,
    {
      path: '*',
      redirect: {
        name: '404'
      },
    }
  ])
  router.options.isAdd = true
}

export default router
