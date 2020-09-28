"use strict";

var _index = _interopRequireDefault(require("index.js"));

var _axios = _interopRequireDefault(require("axios"));

var _layout = _interopRequireDefault(require("@/views/layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _import = function _import(file) {
  return require('@/views/' + file + '.vue')["default"];
}; //获取组件的方法


//Layout 是架构组件，不在后台返回，在文件里单独引入
var getRouter; //用来获取后台拿到的路由
// 假装fakeRouter是通过后台接口请求回来的数据

var fakeRouter = {
  "router": [{
    path: '/link1',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/view/link1'));
      });
    },
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission'
    },
    children: [{
      path: '/link3',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/view/page3'));
        });
      },
      alwaysShow: true,
      name: 'Permission',
      meta: {
        title: 'Permission'
      }
    }]
  }, {
    path: '/link2',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/view/link2'));
      });
    },
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission'
    }
  }]
};

_index["default"].beforeEach(function (to, from, next) {
  console.log(getRouter);

  if (!getRouter) {
    //不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      // easy-mock官网经常挂掉，所以就不请求了,你们可以替换成自己公司的接口去请求,把下方的axios请求打开即可
      // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
      console.log('beforeEach  getRouter');
      getRouter = fakeRouter.router; //假装模拟后台请求得到的路由数据

      saveObjArr('router', getRouter); //存储路由到localStorage

      routerGo(to, next); //执行路由跳转方法
      // })
    } else {
      //从localStorage拿到了路由
      getRouter = getObjArr('router'); //拿到路由

      console.log(getRouter);
      routerGo(to, next);
    }
  } else {
    next();
  }
});

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); //过滤路由

  _index["default"].addRoutes(getRouter); //动态添加路由


  global.antRouter = getRouter; //将路由数据传递给全局变量，做侧边栏菜单渲染工作

  next(_objectSpread({}, to, {
    replace: true
  }));
}

function saveObjArr(name, data) {
  //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data));
}

function getObjArr(name) {
  //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  var accessedRouters = asyncRouterMap.filter(function (route) {
    if (route.component) {
      if (route.component === 'Layout') {
        //Layout组件特殊处理
        route.component = _layout["default"];
      } else {
        route.component = _import(route.component);
      }
    }

    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }

    return true;
  });
  return accessedRouters;
}