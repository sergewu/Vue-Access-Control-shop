import Vue from 'vue';
import Router from 'vue-router';
import instance from "../api";
Vue.use(Router);

let baseRoute = [{
  path: '/login',
  name: '登录',
  component: (resolve) => require(['../views/login.vue'], resolve)
},{
  path: '/home',
  name: '首页',
  component: (resolve) => require(['../views/index/home.vue'], resolve)
},{
  path: '/noticeList',
  name: '公告列表',
  component: (resolve) => require(['../views/index/noticeList.vue'], resolve)
},{
  path: '/noticeDetails',
  name: '公告',
  component: (resolve) => require(['../views/index/noticeDetails.vue'], resolve)
},{
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../views/common/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../views/common/404.vue'], resolve)
}];

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {  
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + '后台管理系统';
  next();
});

export default router;
