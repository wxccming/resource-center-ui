<template>
    <div class="content">
        <div id="mapContainer"></div>
        <!--<div id="map_menu">
                 <el-button type="primary" size="mini" @click="addMarker">地图打点</el-button>
                 <el-button type="primary" size="mini" @click="removeMaker">清除打点</el-button>
             </div>-->

        <div id="infoText" v-show="infoShow">
            <template v-if="infoMsg.pointType=='defect'">
                <div class="defectInfo">
                    <div class="info_title">
                        <span>预警信息</span>
                    </div>
                    <div class="info_content">
                        <div class="warn-pic">
                            <div>
                                <div class="warn-pic-tit">历史图片</div>
                                <div class="warn-pic-tit">拍摄时间:{{ infoMsg.historyImgTime }}</div>
                                <div class="warn-imgBox">
<!--                                    <viewer  :images="[require('@/assets/img/' + infoMsg.historyImg),require('@/assets/img/' + infoMsg.thisImg)]">-->
                                        <img  :src="require('@/assets/img/' + infoMsg.historyImg)" class="picItem" @click="showPic">
<!--                                    </viewer>-->
                                </div>
                            </div>
                            <div>
                                <div class="warn-pic-tit">当前图片</div>
                                <div class="warn-pic-tit">拍摄时间:{{ infoMsg.thisImgTime }}</div>
                                <div class="warn-imgBox">
<!--                                    <viewer :images="require('@/assets/img/' + infoMsg.thisImg)">-->
<!--                                        <img src="@/assets/img/1_2_6.png" class="picItem">-->
                                        <img :src="require('@/assets/img/' + infoMsg.thisImg)" class="picItem" @click="showPic">
<!--                                    </viewer>-->
                                </div>
                            </div>
                        </div>
                        <el-form class="warnForm" :model="warnRuleForm" :rules="warnRules" ref="warnRuleForm"
                                 label-width="100px">
                          <el-form-item label="处理状态" prop="state">
                            <el-radio-group v-model="warnRuleForm.state">
                              <el-radio label="1">处理</el-radio>
                              <el-radio label="2">误报</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="处理时间" prop="disposeTime">
                            <el-date-picker
                                v-model="warnRuleForm.disposeTime"
                                type="date"
                                placeholder="选择处理日期">
                            </el-date-picker>
                          </el-form-item>
                            <el-form-item label="处理意见" prop="desc">
                                <el-input type="textarea" v-model="warnRuleForm.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div style="text-align: right">
                                    <el-button size="mini" type="primary" @click="submitWarnForm('warnRuleForm')">处置
                                    </el-button>
                                    <el-button size="mini" @click="warnCancle">取消</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>
            <template v-if="infoMsg.pointType=='machine'">
                <div class="machineInfo">
                    <div class="info_title" style="margin-top: 10px">
                        <span>机巢信息</span>
                    </div>
                    <div class="info_content">
                        <el-row :gutter="20">
                            <el-col :span="12"><span class="item-label">机巢编号：</span>
                                <span class="item-val">{{ infoMsg.equipmentNo }}</span>
                            </el-col>
                            <el-col :span="12"><span class="item-label">生产厂家：</span>
                                <span class="item-val">{{ infoMsg.airdromeManufacturers }}</span>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12"><span class="item-label">机巢状态：</span>
                                <span class="item-val" style="color: #01E6B9">{{ infoMsg.equipmentStatus }}</span>
                            </el-col>
                          <el-col :span="12"><span class="item-label">机巢类型：</span>
                            <span class="item-val">{{ infoMsg.buyTime }}</span>
                          </el-col>
                        </el-row>
<!--                            <el-col :span="12"><span class="item-label">机巢位置：</span>-->
<!--                                <span class="item-val">{{ infoMsg.area }}</span>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
                        <el-row :gutter="20">
                          <el-col :span="12"><span class="item-label">机巢位置：</span>
                            <span class="item-val">{{ infoMsg.area }}</span>
                          </el-col>
                          <el-col :span="12"><span class="item-label">上次执行时间：</span>
                            <span class="item-val">{{ infoMsg.executeTime }}</span>
                          </el-col>
                        </el-row>

                    </div>
                    <div class="info_title">
                        <span>无人机信息</span>
                    </div>
                    <div class="info_content">
                        <el-row :gutter="20">
                          <el-col :span="12"><span class="item-label">无人机编号：</span>
                            <span class="item-val">{{ infoMsg.uavManufacturers }}</span>
                          </el-col>
                          <el-col :span="12"><span class="item-label">无人机型号：</span>
                            <span class="item-val">{{ infoMsg.uavModel }}</span>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12"><span class="item-label">设备状态：</span>
                                <span class="item-val" style="color: #01E6B9">{{ infoMsg.uavStatus }}</span>
                            </el-col>
                          <el-col :span="12"><span class="item-label">无人机类型：</span>
                            <span class="item-val">{{ infoMsg.uavType }}</span>
                          </el-col>
                        </el-row>
<!--                        <el-row :gutter="20">-->
<!--                            <el-col :span="12"><span class="item-label">无人机SN码：</span>-->
<!--                                <span class="item-val">{{ infoMsg.uavSn }}</span>-->
<!--                            </el-col>-->
<!--                            <el-col :span="12"><span class="item-label">飞控编号：</span>-->
<!--                                <span class="item-val">{{ infoMsg.flightControlSerial }}</span>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
let dataManager, dataSource
let tilesetArr = []
let markerArr = []
let markerEvent
let kmlSource = []
let flightLine = undefined

export default {
    props: {
        pointCloudUrl: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            infoShow: true,
            thisImg: "",
            historyImg: "",
            infoMsg: window.warnCoord[0],
            warnRuleForm: {
                id:"",
                state: '',
                desc: '',
              disposeTime:''
            },
            warnRules: {
                state: [
                    {required: true, message: '请选择处置状态', trigger: 'change'}
                ]
            }
        }
    },
    watch: {
        pointCloudUrl: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.$nextTick(() => {
                    if (newVal && newVal.length) this.addTileset()
                    else this.removeTileset()
                })
            }
        }
    },
    methods: {
      showPic(){
        this.$viewerApi({
          images: [require('@/assets/img/' + this.infoMsg.historyImg),require('@/assets/img/' + this.infoMsg.thisImg)],
          index: 0, // 图片数组中的索引，此处为第一张图片
        })
      },
        initMap() {
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNDI0NTlmMC0zZWNlLTQ5OGItOTc0OC0xZjFlNGM5ODI5YmEiLCJpZCI6Mzc1MjAsImlhdCI6MTYwNTE1MzE0NX0.NwR43VPfj3lHkMKTonQh0oYxESxFQctYUjC3XxZeKHA'
            window.liMap = new liGlobe.Map("mapContainer", {
                terrainProvider: Cesium.createWorldTerrain(),
                // imageryProvider: LiGlobe_Core.createWorldImagery(),
                sysConfig: {
                    navigationControl: {
                        enableDistanceLegend: true,
                        // enableZoomControls : false,
                        // enableCompass : false
                    },
                },
            });
            dataManager = liGlobe.DataManager(liMap);
            liMap.dataManager.addDOM("SYS_TDT_IMG");//卫星影像
            // liMap.dataManager.addDOM("SYS_TDT_CIA");//卫星注记
            /*liMap.dataManager.addDOM({
                url:window.mapdyUrl+"/DOM/{z}/{x}/{y}.png",
                type: "url",
            })
            // 添加影像
            liMap.dataManager.setDEM({url: window.mapdyUrl+"/DEM/"})*/
            dataSource = new liGlobe.EntityDataSource(liMap)
            //marker点点击触发事件出弹框
            let event = new liGlobe.InputHandler(liMap)
            let _this = this
            event.leftClick((e) => {
                let pickedObject = liMap._viewer.scene.pick(e.position)
                console.log("e", pickedObject)
                _this.infoShow = false
                if (pickedObject && pickedObject.id && pickedObject.id.tag === "marker") {
                    _this.infoMsg = pickedObject.id.attrs
                  // console.log("223451212121"+pickedObject.id.attrs)
                  // _this.thisImg = _this.infoMsg.thisImg;
                  // _this.historyImg = _this.infoMsg.historyImg;
                    _this.moveToCenter([_this.infoMsg.lng,_this.infoMsg.lat])
                    _this.infoShow = true
                    let position = liGlobe.Utils.GisUtils.cartesianToLngLat(liMap._viewer, pickedObject.id.position._value)
                    dataManager.bindDom("infoText", position)
                }
            })
            _this.addMarkerByPosition(window.machineCoord)
            // _this.addKml('./mapKML/area1.ovkml')
            _this.addKml('./mapKML/area2.ovkml')
        },
        addTileset() {
            this.removeTileset()
            let tileset = dataManager.addTileSet({
                url: JSON.parse(JSON.stringify(this.pointCloudUrl))
            })
            // liMap.flyTo(tileset)
            liMap.goTo(window.showCoord)

            tilesetArr.push(tileset)
        },
        removeTileset() {
            tilesetArr.forEach((item) => {
                dataManager.remove3dTiles(item)
            })
            tilesetArr = []
        },
        // 调用手动标点
        addMarker() {
            this.removeMarkerEvent()
            markerEvent = new liGlobe.InputHandler(liMap)
            markerEvent.leftClick((e) => {
                let cartesian = liGlobe.Utils.GisUtils.pickPosition(liMap._viewer, e.position)
                let position = liGlobe.Utils.GisUtils.cartesianToLngLat(liMap._viewer, cartesian)
                console.log("position", position);
                let entity = dataSource.add({
                    position: cartesian,
                    billboard: {
                        image: "./liGlobe/Assets/Images/img/danger_city.png",
                        scale: 0.5,
                    },
                    tag: "marker"
                })
                markerArr.push(entity)
                markerEvent.destroy()
            })
        },
        removeMarkerEvent() {
            if (markerEvent) {
                markerEvent.destroy()
                markerEvent = undefined
            }
        },
        removeMaker() {
            // this.removeMarkerEvent()
            // markerArr.forEach((item) => {
            //     // dataSource.remove(item)
            //     if (item._attrs.pointType != "machine") dataSource.remove(item)
            // })
            // markerArr = []
            dataManager.unBindDom()
            this.infoShow = false
        },
     

        // 标记已有坐标点
        addMarkerByPosition(point) {
          console.log(point,'point9999')
            let _this = this
            this.removeMaker()
            let entityArr = []
            if (Array.isArray(point)) {
                point.forEach((item, index) => {
                    let entity = dataSource.add({
                        position: Cesium.Cartesian3.fromDegrees(parseFloat(item.lng), parseFloat(item.lat), 0),//此处0指的是高度
                        billboard: {
                            image: item.icon ? item.icon : "./liGlobe/Assets/Images/img/danger_city.png",
                            scale: 0.5,
                            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND, //此属性能让点位贴着地形，如不想贴着地形Cesium.HeightReference.NONE
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                        attrs: item,
                        tag: "marker"
                    })
                    entityArr.push(entity)
                })
            } else {
                let entity = dataSource.add({
                    position: Cesium.Cartesian3.fromDegrees(parseFloat(point.lng), parseFloat(point.lat), 0),//此处0指的是高度
                    billboard: {
                        image: point.icon ? point.icon : "./liGlobe/Assets/Images/img/danger_city.png",
                        scale: point.scale ? point.scale : 0.5,
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND, //此属性能让点位贴着地形，如不想贴着地形Cesium.HeightReference.NONE
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    },
                    attrs: point,
                    tag: "marker"
                })
                entityArr.push(entity)
                if (point.pointType != 'machine') {
                    _this.infoShow = true
                    _this.infoMsg = point
                    _this.warnRuleForm.id=point.id
                    let position = liGlobe.Utils.GisUtils.cartesianToLngLat(liMap._viewer, Cesium.Cartesian3.fromDegrees(parseFloat(point.lng), parseFloat(point.lat), 0))
                    console.log("position", position)
                    dataManager.bindDom("infoText", position)
                }
            }
            markerArr = markerArr.concat(entityArr)
            liMap.goTo(window.showCoord)
            if (point.pointType != 'machine')_this.moveToCenter([point.lng,point.lat])
        },
        addKml(url) {
            let KmlSource = Cesium.KmlDataSource.load(url,
                {
                    camera: liMap._viewer.scene.camera,
                    canvas: liMap._viewer.scene.canvas,
                    clampToGround: true //是否自动贴地
                })

            liMap._viewer.dataSources.add(KmlSource).then(function (dataSource) {
                kmlSource.push(dataSource)
                //定位
                // liMap.flyTo(dataSource.entities._entities._array[0])
                liMap.goTo(window.showCoord)
            });
        },
        removeKml() {
            kmlSource.forEach((item) => {
                liMap._viewer.dataSources.remove(item)
            })
        },
        // 航迹模拟
        addTrack() {
            this.removeMaker()
            Cesium.Resource.fetch({
                url: window.trackPoly
            }).then((item) => {
                let pos = item = JSON.parse(item).features[0].geometry.coordinates
                let towerPointList = []
                pos.forEach((element) => {
                    let posJson = {
                        // "airCraftPitchValue": 0,
                        // "airCraftRollValue": 0,
                        "airCraftYawValue": 360,
                        "aircraftAltitude": 1000,//每个点的高程
                        // "aircraftGroudAltitude": 0,
                        "aircraftLatitude": element[1],
                        "aircraftLongitude": element[0],
                        "gimbalPitchValue": -90,
                        // "gimbalRollValue": 0,
                        // "gimbalYawValue": 0,
                        // "isSharePic": false,
                        "isShoot": true,//控制是否绘制每个节点
                        // "opticalZoomFocalLength": 250,
                        // "pointForLineName": "left2",
                        // "positionType": 3,
                        // "rtkFusionHeading": 171.38514174676865,
                    }
                    towerPointList.push(posJson)
                })
                let flightJson = {
                    mRecordPointList: {
                        TowerPointList: towerPointList
                    }
                }
                window.flightManager = liGlobe.FlightLineManager(liMap);
                //控制航迹模拟线条样式
                flightManager.lineOptions = {
                    colorLine: "#00f0ff",
                    colorArrow: "blue",
                    colorPoint: 'yellow',
                    //lineWidth:6,
                    pointSize: 10
                };
                //控制是否循环飞行
                flightManager.stopWhenEnd = true
                //控制两点速度
                flightManager.speed = 8
                //生成航迹类
                if (flightLine) {
                    flightManager.remove(flightLine)//移除航迹
                    flightLine = null
                }
                flightLine = flightManager.add(
                    flightJson
                )
                flightManager.fly(flightLine);
            })
        },
        //移除航迹模拟
        removeTrack() {
            if (flightLine) {
                flightManager.remove(flightLine)//移除航迹
                flightLine = null
                liMap.goTo(window.showCoord)
            }
        },
        moveToCenter(centerPosi) {
            // let centerPosi = [102.87068379, 27.04191761]
            liMap.goTo({
                "position": [
                    centerPosi[0], centerPosi[1],
                    3651.835676989608
                ],
                "pitch": -90,
                "heading": 300,
                "roll": 359.9954653088278
            })
            /*liMap._viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(centerPosi[0], centerPosi[1], 2000),
                // destination: Cesium.Rectangle.fromCartesianArray(rectangle),
                /!*orientation: {
                    "pitch": -29.09506899015584,
                    "heading": 272.08104379568795,
                    "roll": 359.9954653088278
                },*!/
                duration: 5//飞行时间
            });*/
        },
        submitWarnForm(formName) {
            let _this=this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message.success("提交成功")
                    this.removeMaker()
                    let ind=window.warnCoord.findIndex(s=>s.id==this.warnRuleForm.id)
                    window.warnCoord.splice(ind,1)
                  this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        warnCancle(){
            this.removeMaker()
          this.$refs.warnRuleForm.resetFields();
            // this.infoShow=false
        }
    },
    mounted() {
        this.initMap()
    }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}

#mapContainer {
  width: 100%;
  height: 100%;
  position: absolute !important;
  z-index: 0;
  overflow: hidden;
}

#map_menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: calc(21.0vw * (2 - var(--showZoom)) + 5px);
  //top: 36.7%;
  top: calc(360px * (2 - var(--showZoom)));
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

#infoText {
  position: absolute;
}

.defectInfo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 462px;
  height: 450px;
  background-image: url("~@/assets/img/预警处理-bj.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1;
  padding: 10px;

  /deep/ .info_title {
    width: 187px;
    height: 30px;
    margin: 0 auto;
    background: url("~@/assets/img/预警-tit.png") no-repeat 100%;
    color: #ffff;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 30px;
  }

  /deep/ .info_content {
    .warn-pic {
      padding: 8px 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .warn-pic-tit {
        color: #0BF7F7;
        font-size: 14px;
      }

      .warn-imgBox {
        width: 170px;
        height: 113px;
        margin: 5px 0 0;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }

    .warnForm {
      padding: 0 15px 0 10px;

      .el-form-item__label {
        color: rgba(255, 255, 255, 0.6);
      }

      .el-radio .el-radio__label {
        color: #fff;
      }

      .el-radio.is-checked .el-radio__label {
        color: #037755;
      }
    }
  }
}

.machineInfo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 588px;
  height: 280px;
  background-image: url("~@/assets/img/机巢-bj.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 20px 25px;
  z-index: 1;

  /deep/ .info_title {
    color: #0BF7F7;
    border-bottom: 2px solid rgba(43, 49, 53, 0.59);
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 500
  }

  /deep/ .info_content {
    color: #ffff;
    margin: 10px;
    font-size: 14px;

    .el-row {
      margin-bottom: 0.8rem;
    }

    .el-col {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-label {
      color: rgba(255, 255, 255, 0.6);
    }

    .item-val {
      color: #fff;
    }
  }
}
</style>
