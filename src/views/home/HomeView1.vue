<template>
    <div class="home">
        <!-- <div class="map" style="height: 100%; width: 100%" > -->
        <Map ref="map" :pointCloudUrl="pointCloud"></Map>
        <!-- </div> -->
        <div class="leftWrap">
            <!--:default-expanded-keys="treeExpanded ? treeExpanded : []"-->
            <div class="content" :class="leftShow ? 'wOpen' : 'wShrink'">
                <div class="top">
                    <commonTit title="抽蓄电站基本信息"/>
                    <H3>装机容量为 1800MW</H3>
                  <el-divider/>
                  <el-carousel indicator-position="outside" :autoplay="false" >
                    <el-carousel-item none v-for="item in basic" :key="item" >
                      <H3 v-html="item"></H3>
                    </el-carousel-item>
                  </el-carousel>
<!--                 <swiper>
                   <swiper-slide>
                     <p>控制流域面积:1.99km2</p>
                   </swiper-slide>
                   <swiper-slide>
                     <p>控制流1.99km2</p>
                   </swiper-slide>
                 </swiper>-->

                </div>
                <div class="bottom">
                    <commonTit title="预警记录"/>
                    <warnRecord @warnChooseMsg="warnTabChoose"/>
                </div>
            </div>
            <div class="statisticsBtn" @mouseover="$refs.statistics.showStatistics = !$refs.statistics.showStatistics"
            ></div>
            <img v-if="leftShow" class="colBtn" src="@/assets/img/收缩左.png" @click="expandChange('left')"/>
            <img v-else class="colBtn" src="@/assets/img/close-left.png" @click="expandChange('left')"/>
        </div>
<!--        <statisticsCenter ref="statistics" class="statisticsWrap"/>-->
        <div class="rightWrap">
            <div class="content rightCon" :class="rightShow ? 'wOpen' : 'wShrink'">
                <taskList @showTaskInfo="showTaskInfo" @taskChooseMsg="taskChooseMsg"/>
                <taskMsg :taskData="taskData"/>
                <airWorkMsg :taskData="taskData"/>
                <timeVideo/>
            </div>
            <img v-if="rightShow" class="colBtn" src="@/assets/img/收缩右.png" @click="expandChange('right')"/>
            <img v-else class="colBtn" src="@/assets/img/close-right.png" @click="expandChange('right')"/>
        </div>

        <!--详情-->
        <Dialog
            :title="'详情'"
            :width="`750px`"
            :dialogVisible="taskInfoVisible"
            @updateStatus="(val) => (this.taskInfoVisible = val)"
        >
            <add-task
                @close="() => (taskInfoVisible = false)"
                :type="'3'"
                :row="taskRow"
            ></add-task>
        </Dialog>
    </div>
</template>

<script>
import {Loading} from "element-ui";
import {mapState} from "vuex";
import Map from "./components/map.vue";
import warnRecord from "./warnRecord.vue"
import taskList from "./rightComponents/taskList";
import taskMsg from "./rightComponents/taskMsg";
import airWorkMsg from "./rightComponents/airWorkMsg";
import timeVideo from "./rightComponents/timeVideo";
import statisticsCenter from "./components/statisticsCenter";
import addTask from "../task/finePatrol/components/addTask.vue";
import storage from "@/utils/storage";
import commonTit from "./rightComponents/title";
import {getAssetsIcon} from "@/utils/getAssetsIcon";


export default {
    components: {
        Map,
        warnRecord,
        taskList,
        taskMsg,
        airWorkMsg,
        timeVideo,
        statisticsCenter,
        addTask,
        commonTit
    },
    name: "HomeView",
    created() {},
    beforeDestroy() {},
    data() {
        return {
            emptyImg: getAssetsIcon("nodata.png"),
            leftShow: true,
            rightShow: true,
            taskRow:{},
            taskInfoVisible:false,
            taskData: {},
            warnTabClickData:null,
            pointCloud: "", // 获取的点云数据地址
            isFlying:false,
            basic:[
              "上水库:<br>控制流域面积：  1.99km<br>正常蓄水位为：  725.00m<br>设计洪水位为：  726.10m<br>" +
              "校核洪水位为：  726.54m<br>死水位：                 695m<br>坝顶高程：      729.20m<br>大坝坝顶宽度：      10m<br>" +
              "坝轴线长：      510m<br>最大坝高：      89.2m",
              "下水库:<br>控制流域面积：  65.3km<br>正常蓄水位为：  319.00m<br>设计洪水位为：  319.00m<br>" +
              "校核洪水位为：  321.87m<br>死水位：        298.00m<br>坝顶高程：      323.85m<br>大坝坝顶宽度：  10m<br>" +
              "坝顶长：        375m<br>最大坝高：      49.0m"
            ]
        };
    },
    computed: {
        ...mapState({
            websocketData: (state) => state.websocket.websocketData,
        }),
    },
    methods: {
        // 获取点云地址
        getPointClound() {
            // http://192.168.10.173:11886/mapUrl/pointcloudFile/pointcloud/linedata/cesium/cesium/tileset.json
            this.pointCloud = window.pointCloud;
        },
        // 左下角饼图点击
        warnTabChoose(item) {
            if (this.warnTabClickData == item) {
                this.warnTabClickData = null;
                this.$refs.map.removeMaker()
            } else {
                this.warnTabClickData = item;
                this.$refs.map.addMarkerByPosition(item)
            }
        },
        // 左右按钮展开
        expandChange(type) {
            if (type == "left") {
                this.leftShow = !this.leftShow;
            } else {
                this.rightShow = !this.rightShow;
                // this.$refs.map.setToolRight(this.rightShow);
            }
        },
        showTaskInfo(row) {
            this.taskRow = row;
            this.taskInfoVisible = true;
        },
        taskChooseMsg(row) {
            console.log("taskChooseMsg",row)
            // 执行航迹模拟
            if(this.isFlying){
                this.isFlying=false
                this.$refs.map.removeTrack()
            }
            else {
                this.isFlying=true
                this.$refs.map.addTrack()
            }
        }
    },
    watch: {},
    mounted() {
        this.getPointClound()
    },
};
</script>
<style src="./PatrolDialog.scss" lang="scss" scoped></style>
<style src="./dialogDefect.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;

  .leftWrap,
  .rightWrap {
    position: absolute;
    bottom: 1rem;
    height: calc(100% - 3rem);
    transition: all 0.3s ease-in;

    .content {
      position: relative;
      // width: 20vw;
      height: 100%;
      transition: all 0.3s ease-in;
      background-color: rgba($color: #0c2017, $alpha: 0.6);
      border: 1px solid #01c696;
      border-radius: 1px;
      padding: 8px 1rem;

      .top {
        border-bottom: 1px solid #01c696;
      }

      .top,
      .bottom {
        font-size: 14px;
        height: 45%;
        color: #fff;
      }
    }

    .wOpen {
      width: 37rem;
    }

    .wShrink {
      width: 0;
      padding: 0;
      border: none;
      overflow: hidden;
    }

    .colBtn {
      position: absolute;
      top: 20px;
    }
  }

  .leftWrap {
    left: 1rem;

    .colBtn {
      right: -25px;
    }
  }

  .rightWrap {
    right: 1rem;

    .colBtn {
      left: -25px;
    }
  }

  .statisticsWrap {
    position: absolute;
    top: 4rem;
    width: calc(100% - 85rem);
    left: 50%;
    transform: translateX(-50%);
  }
}

.statisticsBtn {
  /*width: 23px;
  border: 1px solid #01C696;
  border-radius: 0 5px 5px 0;
  position: absolute;
  top: 80px;
  color: #fff;
  right: -23px;
  text-align: center;
  padding: 8px 0;
  background-color: rgba($color: #0C2017, $alpha: 0.6);
  cursor: pointer;*/
  width: 33rem;
  height: 3rem;
  position: absolute;
  top: 0rem;
  right: -36rem;
  background: transparent;
  cursor: pointer;
}

.rightCon {
  display: flex;
  flex-direction: column;
  overflow: auto;
  //>div{
  //  flex:1;
  //}
}

.treeBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: transparent;
  color: #fff;
  font-size: 14px;

  ::v-deep .el-tree-node__content:hover {
    background: #1f5950;
  }

  ::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  ::v-deep .el-tree-node__children {
    .el-tree-node__content {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 5px;
        height: 100%;
        left: 0;
      }

      &:hover {
        &::before {
          background: #2cffdc;
        }
      }
    }
  }

  ::v-deep .el-tree-node.is-current {
    > .el-tree-node__content {
      background-color: #1f5950 !important;

      &::before {
        background: #2cffdc;
      }
    }
  }
}

.treeFirst {
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  overflow: hidden;

  img {
    margin-right: 10px;
  }

  span {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 10px;
  }
}

.treeChildren {
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  overflow: hidden;

  .circularBox {
    width: 14px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 10px;

    .circular {
      width: 10px;
      height: 10px;
      background: #0b9a96;
      border-radius: 50%;
      box-shadow: 0 0 5px #185f57;

      &:before {
        content: "";
        width: 0;
        height: 50%;
        border-left: 1px dashed #28c8b8;
        bottom: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  span {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 10px;
  }
}

::v-deep .el-tree-node__children {
  > .el-tree-node {
    &:last-child {
      > .el-tree-node__content {
        .circular {
          &::before {
            height: 0;
          }
        }
      }
    }
  }
}

::v-deep .el-tree-node.is-current {
  > .el-tree-node__content {
    .circular {
      background: #01eebf;
      box-shadow: 0 0 5px #185f57;
    }
  }
}

.pagination {
  float: right;
  display: flex;
  align-items: center;
  margin-top: 1rem;

  .pageBtnImg {
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #00c9b1;
    border-radius: 2px;
  }

  .pageNum {
    color: #fff;
    margin: 0 8px;

    .current {
      color: #00c9b1;
    }
  }
}

.workingMinus {
  position: absolute;
  bottom: 10px;
  right: calc(23vw);
  width: 98px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  background: #06322c;
  opacity: 1;
  border: 2px solid;
  border-image: radial-gradient(
                  circle,
                  rgba(0, 237, 254, 1),
                  rgba(1, 198, 149, 1)
  ) 2 2;
  z-index: 3000;
}

.fullIcon {
  position: absolute;
  left: 40rem;
  bottom: 10px;
  background: #0b9a96;
}
</style>
