import {Vue,router} from './common/core.js';
import request from './common/request.js';
import App from './App.vue';
import 'iview/dist/styles/iview.css';

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
// 导入工具部分
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
// register component to use
import 'echarts/lib/component/legendScroll';
// register component to use
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/dataZoom';

Vue.component('chart', ECharts);

Vue.prototype.request = request;

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
