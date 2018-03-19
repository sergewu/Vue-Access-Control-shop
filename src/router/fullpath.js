import shoppath from './shoppath'
const path = [{
    path: '/',
    name: '首页',
    meta: {
      title: '首页', noCache: true  
    },
    component: (resolve) => require(['../views/index.vue'], resolve),
    children: shoppath
}]

export default path;