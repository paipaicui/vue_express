import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'

Vue.use(Router)

let asyncRoutes = [{
  path: '/link1',
  component: () => import('@/view/page1'),
  alwaysShow: true,
  name: 'Permission',
  meta: {
    title: 'Permission'
  },
  children: [{
    path: '/link3',
    component: () => import('@/view/page3'),
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission'
    }
  }]
}, {
  path: '/link2',
  component: () => import('@/view/page2'),
  alwaysShow: true,
  name: 'Permission',
  meta: {
    title: 'Permission'
  }
}]

let newItem = {};

function hasChildren(data) {
  asyncRoutes.forEach((currentValue, index, arr) => {
    //console.log(, index, arr)

    if (data.link == currentValue.path) {
      console.log(currentValue)
    }
  })
}

axios.get('/admin/users').then(function (res) {
  res.data.map(item => {
    hasChildren(item)
  })
});

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }].concat(asyncRoutes)
})
