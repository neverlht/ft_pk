import Vue from "vue"
import iView from "iview"
import VueRouter from 'vue-router'
import Routers from '../router'

Vue.use(VueRouter);
Vue.use(iView);
Vue._userToken = "";

// 路由配置
const RouterConfig = {
  mode: 'hash',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

/**
 * 加载进度条设置样式
 */
iView.LoadingBar.config({
  color: '#d9ecff',
  height:5
});

export {Vue,iView,router};
