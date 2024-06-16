<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import devPixelRatio from "@/utils/devicePixelRatio.js";
export default {
  name: "app",

  created() {
    new devPixelRatio().init(); // 初始化页面比例
  },
};
</script>

<style lang="scss">
$zoom: get-zoom();

@function get-zoom() {
  @return #{zoom};
}
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  //font-size: 100%;
  font-size: 62.5%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: #e2e6f0;
}

// ::-webkit-scrollbar {
//   width: 6px;
//   display: none;
// }

/*滚动条里面轨道*/
/*::-webkit-scrollbar-track{
  background: #163361;
  border-radius: 3px;
}*/
/*滚动条里面小方块*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   background: #008563;
// }


  /*滚动条的宽度*/
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px !important;; 
    background: #f1f1f1;
    margin-top: 5px;
}
::-webkit-scrollbar-track {
    border-radius: 5px;
}
::-webkit-scrollbar-thumb {
    background: #c1c1c1;
   
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
}
</style>
