"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var _import = function _import(file) {
  return require('../view/' + file + '.vue')["default"];
};

var globalRoutes = [{
  path: '/404',
  component: _import('404'),
  name: '404',
  meta: {
    title: '404'
  }
}, {
  path: '/login',
  component: _import('login'),
  name: 'login',
  meta: {
    title: '登录页'
  }
}];
var router = new _vueRouter["default"]({
  isAdd: false,
  //是否已经添加动态(菜单)路由
  routes: globalRoutes
});
var _default = router;
exports["default"] = _default;