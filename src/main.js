import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/index.scss";
import "./directive";


import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'

import 'quill/dist/quill.snow.css'

import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

import storage from "./utils/storage";
Vue.prototype.$db = storage;

// 引入 echarts-gl 模块
import "echarts-gl";
// import echarts from 'echarts'
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

import globalComponents from "@/components/globalComponents"; // 高频组件 components 下 全局自动注册
Vue.use(globalComponents);

import 'swiper/swiper-bundle.min.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);


// viewer
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});
// element-ui
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import "./element-variables.scss";
Vue.use(ElementUI);

// VueVideoPlayer
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
