"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetRouter = resetRouter;
exports["default"] = exports.asyncRoutes = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var commonRoutes = [{
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/login.vue'));
    });
  }
}, {
  path: '/link1',
  // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
  name: 'path1',
  meta: {
    title: '单独的路由'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/link1.vue'));
    });
  }
}, {
  path: '/',
  redirect: '/login'
}]; // 本地所有的页面 需要配合后台返回的数据生成页面

var asyncRoutes = {
  home: {
    path: 'link2',
    name: 'link2',
    meta: {
      title: '主页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view/link2.vue'));
      });
    }
  },
  t1: {
    path: 'link3',
    name: 'link3',
    meta: {
      title: '表格'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view/page3.vue'));
      });
    }
  }
};
exports.asyncRoutes = asyncRoutes;

var createRouter = function createRouter() {
  return new _vueRouter["default"]({
    routes: commonRoutes
  });
};

var router = createRouter();

function resetRouter() {
  var newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

function createRoutes(data) {
  var result = [];
  var children = [];
  result.push({
    path: '/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view/page3.vue'));
      });
    },
    children: children
  });
  data.forEach(function (item) {
    console.log(item);
    generateRoutes(children, item);
  }); // 最后添加404页面 否则会在登陆成功后跳到404页面

  result.push({
    path: '*',
    redirect: '/404'
  });
  return result;
}

function generateRoutes(children, item) {
  if (item.name) {
    if (asyncRoutes[item.name]) children.push(asyncRoutes[item.name]);
  } else if (item.children) {
    item.children.forEach(function (e) {
      generateRoutes(children, e);
    });
  }
}

router.beforeEach(function _callee(to, from, next) {
  var routes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(to, from);
          routes = createRoutes(); // 动态添加路由

          router.addRoutes(routes);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;