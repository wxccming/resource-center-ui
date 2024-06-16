<template>
  <div class="content">
    <div id="map"></div>
    <div class="map2d">
      <div class="mapBtn">
        <div class="controlBtn" @click="isPause==true?flightPause():flightContinue()">{{isPause == true ? '暂停':'飞行预览'}}</div>
        <div class="controlBtn" @click="removeFlight">停止</div>
      </div>
      <div id="map2d"></div>
    </div>
    <div id="tooltip" class="tooltip">
      <div v-for="(tool,index) in tooltip" :key="'tool_'+index" @mouseover="handleMouseOver(tool)" @mouseout="handleMouseOut(tool)" @click="handleTooltipClick(tool)">
        <img :src="tool.isSelected?tool.imgSelected:tool.imgNormal">
      </div>
    </div>
  </div>
</template>
<script>
import { Style } from "@svgdotjs/svg.js";
import {getAssetsIcon} from '@/utils/getAssetsIcon'
import { testLineTower, removeLineTower, resetLine } from '../lineTower';
import {testRealTimePath} from '../realTimePathTest'
let map;
let tile;
let flightLine;
let collection;
export default {
  data() {
    return {
      tooltip:[
        {toolId:'angle',name:'测量角度',imgNormal: getAssetsIcon('图层1099.png'),imgSelected:getAssetsIcon('图层1099拷贝.png'),isSelected:false},
        {toolId:'length',name:'测量长度',imgNormal:getAssetsIcon('图层852拷贝.png'),imgSelected:getAssetsIcon('图层852拷贝2.png'),isSelected:false},
        {toolId:'height',name:'测量高度',imgNormal:getAssetsIcon('图层1098.png'),imgSelected:getAssetsIcon('图层1098拷贝.png'),isSelected:false},
        {toolId:'area',name:'测量面积',imgNormal:getAssetsIcon('图层1097.png'),imgSelected:getAssetsIcon('图层1097拷贝.png'),isSelected:false},
        {toolId:'pickup',name:'拾取坐标',imgNormal:getAssetsIcon('图层1095.png'),imgSelected:getAssetsIcon('图层109拷贝.png'),isSelected:false},
        {toolId:'clear',name:'清除',imgNormal:getAssetsIcon('形状1101.png'),imgSelected:getAssetsIcon('形状1101拷贝.png'),isSelected:false},
      ],
      isPause:true,
      toolStyle:{
        //样式相关设置
        pointSize: 5,
        pointColor: "yellow",
        textInfo: "角度：",
        lineColor: "green",
        lineColorTemp: "red",
        lineWidth: 2,
        // maxDistance: 1e5, //点线面最大可视距离
        labelOpt: {
          // maxDistance: 1e3, //标签最大可视距离
          borderWidth: 2,
          font: "sans-serif",
          fontSize: 16,
          margin: 3,
          //top:5,
          //bottom:0,
          textColor: "yellow",
          borderColor: "rgba(123,209,122,0.5)",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      map = new liGlobe.Map("map", {
        sysConfig: {
          navigationControl: {
            enableDistanceLegend: true,
            // enableZoomControls : false,
            // enableCompass : false
          },
        },
      });
      const dataManager = liGlobe.DataManager(map);
      const toolManager = liGlobe.ToolManager(map);
      //   console.log('map', map);
      //   map.canvas.height = map.domElement.offsetHeight;
      //   map.canvas.width = map.domElement.offsetWidth;
      toolManager.init("measure", true); //第二个参数true代表完全自定义重写ui
      const powerLineManager = liGlobe.PowerLineManager(map);
      dataManager.addDOM("SYS_TDT_IMG"); //线上天地图影像
      // 添加地形
      dataManager.setDEM({url: "/mapUrl/DEM/"})
      // dataManager.removeDEM()//删除地形
      // 添加影像
      dataManager.addDOM({
        url: "/mapUrl/DOM/{z}/{y}/{x}.png",
        // url: "http://793863183.e3.luyouxia.net:12819/DOM/{z}/{y}/{x}.png",
        type: "url",
      })
      //dataManager.removeLayer(layer)//移除影像
      // 添加路网图层
      dataManager.addDOM({
        type: "url",
        url: "/mapUrl/DSM/{z}/{y}/{x}.png"
      })
      // 添加重庆市边界
      liGlobe.fetchData('./json/重庆市边界.json',(e)=>{
        map.goTo({
          "position": [107.993376,30.016558, 1000000]
        })
        e.features[0].geometry.coordinates.forEach((element)=>{
          dataManager.drawRegion(element[0],{
            width:2, // 线宽
            color:"rgba(1, 238, 191, 1)" // 线颜色
          })
        })
      })
      // 移除重庆市边界
      // dataManager.removeRegion()
      // 地图上添加无人机
      testRealTimePath(map)
    });
  },
  methods: {
    handleMouseOver(tool){
      tool.isSelected = true
    },
    handleMouseOut(tool){
      tool.isSelected = false
    },
    handleTooltipClick(tool){
      switch (tool.toolId) {
        case 'angle':
          this.measureAngle()
          break;
        case 'length':
          this.measureLength()
          break;
        case 'height':
          this.measureHeight()
          break;
        case 'area':
          this.measureArea()
          break;
        case 'pickup':
          this.measurePick()
          break;
        case 'clear':
          this.measureClear()
          break;
      }
    },
    // 杆塔定位
    locationTo(lng,lat){
      map.goTo({
        position: [lng, lat, 1000],
      });
    },
    flightSimulate(JsonData) {
      // let url = "./json/chaan54new.json";
      let url = JsonData.routePath;
      fetch(url)
          .then((b) => {
            return b.json();
          })
          .then((data) => {
            // let flight = new FlightLine(viewer, data, option)
            window.flightManager = liGlobe.FlightLineManager(map);
            //控制航迹模拟线条样式
            flightManager.lineOptions = {
              colorLine: "#00f0ff",
              colorArrow: "blue",
              colorPoint: "yellow",
              //lineWidth:6,
              //pointSize:4
            };
            //控制是否循环飞行
            flightManager.stopWhenEnd = false;
            //控制两点速度
            flightManager.speed = 3;
            //生成航迹类
            if (flightLine) {
              flightManager.remove(flightLine);
              flightLine = null;
            }
            flightLine = flightManager.add(data, {
              towerEvent: (e) => {
                // console.log(e)
              },
            });
            //添加小窗口点云
            document.querySelector('.map2d').style.display='block'
            flightLine.tile = {
              url: JsonData.cloudPath,
              // url:"./chaan/54#-55#/tileset.json",
            };
            /**
             * "map2d" 小窗口元素domid
             */
            flightManager.fly(flightLine, "map2d");//domid 不传则无小窗口
            // flightManager.fly(flightLine);
            // //其他方法
            // flightManager.pause()//暂停
            // flightManager.continue()//继续
            flightManager.setFastForwardSpeed(2); //倍速，不高于64
            // flightManager.remove(flightLine)//删除航线模拟
          });
    },
    // 航迹暂停
    flightPause(){
      this.isPause = false
      flightManager.pause()
    },
    // 航迹继续
    flightContinue(){
      this.isPause = true
      flightManager.continue()
    },
    // 移除航迹摸拟
    removeFlight() {
      document.querySelector('.map2d').style.display='none'
      flightManager.remove(flightLine); //删除航线模拟
    },
    addLines(data) {
      if(data[0].towerList.length == 0){
        // this.$message.warning(data[0].lineName +'下无杆塔！')
        return
      }
      map.goTo({
        position: [data[0].towerList[0].lon,data[0].towerList[0].lat,1000],
      });
      this.removeLines();
      testLineTower(map,data, false);
      // testLineTower(map,data, false);
    },
    removeLines() {
      removeLineTower(map);
    },
    resetLines(){
      resetLine()
    },
    // 绘制工况摸拟点
    addWorkingCondition(jsonData){
      const dataManager = liGlobe.DataManager(map);
      console.log('collection',collection);
      if(!collection){
        collection = new liGlobe.Collection(map)
      }
      let pointCollection = collection.addPointPrimitiveCollection({
        // blendOption: LiGlobe_Core.BlendOption.OPAQUE
      })

      liGlobe.fetchData(jsonData, (e) => {
        console.log(e)
        /*let tile1 = dataManager.addTileSet({
          url: "./chaan/红瓦1线6#-7#/tileset.json"
        })
        tile1.style = new LiGlobe_Core.Cesium3DTileStyle({
          pointSize: 10,
        })
        map.zoomTo(tile1)*/
        e.PointsPosition.forEach((item) => {
          pointCollection.add({
            position: LiGlobe_Core.Cartesian3.fromDegrees(item.x[0], item.y[0], item.z[0]),
            pixelSize: 3,
            color: Cesium.Color.YELLOW
          })
        })
      })
    },
    removeWorkingCondition(){
      if(collection){
        collection.removeAll()
      }
    },
    destroyWorkingCondition(){
      this.removeWorkingCondition()
      if(collection){
        collection.destroy()
        collection = null
      }
    },
    addTiles() {
      if (!tile) {
        tile = map.dataManager.addTileSet({
          url: "./chaan/屏梨线1#-2#/tileset.json",
          // url:"http://yuzw.e3.luyouxia.net:13156/pointcloud/linedata/屏梨线/屏梨线1#-2#/tileset.json"
        });
        map.flyTo(tile, {
          duration: 0, //飞行时间
        });
      }
    },
    removeTiles() {
      if (tile) {
        map.dataManager.remove3dTiles(tile);
      }
    },
    measurePick() {
      map.toolManager.start("pickup",this.toolStyle);
    },
    measureAngle() {
      this.toolStyle.textInfo = '角度:'
      map.toolManager.start("angle", this.toolStyle);
    },
    measureLength() {
      map.toolManager.start("distance", this.toolStyle);
    },
    measureHeight() {
      delete this.toolStyle.lineColorTemp
      map.toolManager.start("height", this.toolStyle);
    },
    measureArea() {
      delete this.toolStyle.lineColorTemp
      this.toolStyle.polygonColor = "rgba(120,109,56,0.4)"
      this.toolStyle.calculateArea = true
      map.toolManager.start("area", this.toolStyle);
    },
    measureClear() {
      map.toolManager.removeAllByType("measure");
    },
    setToolRight(type) {
      let tool1 = map.domElement.querySelector("#navigationDiv>.compass") ?? {};
      let tool2 =
          map.domElement.querySelector("#navigation-zoomControls") ?? {};
      let tool3 = document.querySelector('#tooltip') ?? {}
      let map2d = document.querySelector('#map2d') ?? {}
      if(tool1&&tool2&&tool3&&map2d){
        if (type) {
          tool1.style.right = "21vw"; // calc(21vw * (2 - var(--showZoom)))
          tool2.style.right = " calc(21vw + 15px)";
          tool3.style.right = `calc(21.0vw * (2 - ${this.$zoom}) + 5px)`;
          map2d.style.right = "calc(21.3vw * (2 - var(--showZoom)))"
        } else {
          tool1.style.right = "2.5vw";
          tool2.style.right = "calc(2.5vw + 15px)";
          tool3.style.right = `calc(2.5vw * (2 - ${this.$zoom}) + 5px)`
          map2d.style.right = `calc(2.5vw * (2 - ${this.$zoom}) + 5px)`
        }
      }
    },
    destroyMap(){
      map.destroy()
    }

  },
};
</script>
<!-- <style lang="sass" scoped></style> -->
<style scoped lang="scss">
.tooltip{
  width: 50px;
  height: auto;
  border-radius: 6px;
  background: rgba(0,0,0,0.4);
  position: absolute;
  display: flex;
  flex-direction: column;
  right: calc(21.0vw * (2 - var(--showZoom)) + 5px);
  //top: 36.7%;
  top: calc(360px * (2 - var(--showZoom)));
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:5px 0px;
  transition: all 0.3s ease-in;
  div{
    margin: 3px;
    img{
      scale: 0.8;
    }
  }
}
#test {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 22%;
  top: 40%;
  z-index: 1;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
#map {
  width: 100%;
  height: 100%;
  position: absolute !important;
  z-index: 0;
  overflow: hidden;
}
.map2d{
  width: 350px;
  height: 200px;
  position: absolute;
  z-index: 1;
  bottom: 10px;
  right: calc(21.2vw);
  display: none;
  transition: all 0.3s ease-in;
  .mapBtn{
    display: flex;
    .controlBtn{
      width: 50px;
      border: 1px solid #01C696;
      border-radius: 5px 5px 0 0;
      color: #fff;
      text-align: center;
      padding: 4px 0;
      background-color: rgba($color: #0C2017, $alpha: 0.6);
      cursor: pointer;
      margin-right: 10px;
    }
  }
  #map2d{
    border: 1px solid #01C696;
    height: 175px;
  }
}
::v-deep .cesium-viewer {
  width: 100%;
  height: 100%;
  .cesium-viewer-cesiumWidgetContainer {
    height: 100%;
  }
  .cesium-widget {
    width: 100%;
    height: 100%;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep #navigationDiv > .compass {
  transition: all 0.3s ease-in;
  right: 21vw;
  //right: calc(21vw * (2 - var(--showZoom)));
}
::v-deep #navigation-zoomControls {
  transition: all 0.3s ease-in;
  right: calc(21vw + 15px);
  //right: calc(21vw * (2 - var(--showZoom)) + 15px);
}
</style>
