import Vue from 'vue';
import vueScroll from 'vuescroll';

// 你可以在这里设置全局配置
Vue.use(vueScroll, {
    ops: {
        rail: {
            background: 'rgba(0, 0, 0, 0)',
            gutterOfSide: '0px',
            size: '5px',
        },
        bar: {
            background: '#689090',
            size: '5px',
        }
    }, // 在这里设置全局默认配置
});
