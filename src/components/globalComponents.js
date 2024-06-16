import Vue from "vue";

function changeStr(str) {
  //首字母大写
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//找到 common目录下的.vue结尾的所有文件
const requireComponent = require.context("./common", false, /\.vue$/);

const requireTemp = require.context("./template", false, /\.vue$/);
// const echartsTemp = require.context("./echarts", false, /\.vue$/);

const chartsTemp = require.context("./charts", false, /\.vue$/);

const realTimeVideo = require.context("./realTimeVideo", false, /\.vue$/);
const MultipleRealTimeVideo = require.context("./MultipleRealTimeVideo", false, /\.vue$/);

const install = (Vue) => {
  requireComponent.keys().forEach((fileName) => {
    let config = requireComponent(fileName);
    let componentName = changeStr(
      fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")
    );

    Vue.component(componentName, config.default || config);
  });

  requireTemp.keys().forEach((fileName) => {
    let config = requireTemp(fileName);
    let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");

    Vue.component(componentName, config.default || config);
  });

  // echartsTemp.keys().forEach((fileName) => {
  //   let config = echartsTemp(fileName);
  //   let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");

  //   Vue.component(componentName, config.default || config);
  // });

  chartsTemp.keys().forEach((fileName) => {
    let config = chartsTemp(fileName);
    let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");

    Vue.component(componentName, config.default || config);
  });

  realTimeVideo.keys().forEach((fileName) => {
    let config = realTimeVideo(fileName);
    let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");

    Vue.component(componentName, config.default || config);
  });


  MultipleRealTimeVideo.keys().forEach((fileName) => {
    let config = MultipleRealTimeVideo(fileName);
    let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");

    Vue.component(componentName, config.default || config);
  });
};
export default {
  install,
};
