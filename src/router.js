const routers = [
  {
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./components/login.vue'], resolve)
  },{
    path: '/main',
    meta: {
      title: ''
    },
    component: (resolve) => require(['./components/main/main.vue'], resolve)
  },{
    path: '/reg',
    meta: {
      title: ''
    },
    component: (resolve) => require(['./components/main/reg.vue'], resolve)
  }
];
export default routers;
