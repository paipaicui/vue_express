"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetRouter = resetRouter;
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _axios = _interopRequireDefault(require("axios"));

var _bodyParser = require("body-parser");

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
  },
  children: [{
    path: '/link1/page3',
    name: 'page33',
    meta: {
      title: '登录'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view/page3.vue'));
      });
    }
  }]
}, {
  path: '/',
  redirect: '/login'
}]; // 本地所有的页面 需要配合后台返回的数据生成页面

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
  data.forEach(function (item) {
    result.push({
      path: item.path,
      // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
      meta: {
        title: item.title
      },
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("".concat('../view/' + item.components + '.vue')));
        });
      } //children: createRoutes(item.children)

    });
  });
  return result;
}

if (localStorage.getItem('router')) {
  var s = JSON.parse(localStorage.getItem('router'));
  router.addRoutes(createRoutes(s));
} else {
  router.beforeEach(function _callee(to, from, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _axios["default"].get('/admin/users').then(function (res) {
              var routes = createRoutes(res.data);
              localStorage.setItem('router', JSON.stringify(res.data));
              router.addRoutes(routes);
            });

            next();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}

var _default = router;
exports["default"] = _default;