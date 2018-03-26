import shoppath from './shoppath'
const path = [{
    path: '/',
    name: '',
    meta: {
      title: '', noCache: true  
    },
    component: (resolve) => require(['../views/index.vue'], resolve),
    children: shoppath
}]

export default path;