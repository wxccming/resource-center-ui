<template>
  <div class="realTimeVideo">
    <div class="realLeft">
      <el-form ref="form" :model="form" label-width="auto" size="mini">
        <el-form-item label="线路名称">
          <el-input v-model="form.lineName" readonly></el-input>
        </el-form-item>
<!--        <el-form-item label="电压等级">
          <el-input v-model="form.voltageName" readonly></el-input>
        </el-form-item>-->
        <el-form-item label="巡检数量">
          <el-input v-model="form.taskTowerNum" readonly></el-input>
        </el-form-item>
        <el-form-item label="维护班组">
          <el-input v-model="form.maintainName" readonly></el-input>
        </el-form-item>
        <el-form-item label="执行人员">
          <el-input v-model="form.chargePerson" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="realMain" ref="realMain">
<!--      <UAVMap ref="UAVMap" />-->

      <div class="realMainVideo" :style="`right: ${right}px;`">
        <div class="realMainVideoTitle">
          <span>无人机视角</span>
          <i @click="videoScaling" class="el-icon-full-screen"></i>
        </div>
        <div>
          <LiveVideo
            v-if="Object.keys(form).length"
            :address="address"
            ref="LiveVideo"
          />
        </div>
      </div>
    </div>

    <div class="realRight" :style="`height: ${height}px;`">
      <el-form ref="form" :model="realTimeData" label-width="auto" size="mini">
        <el-form-item label="无人机位置">
          <el-input v-model="realTimeData.lat" readonly></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="realTimeData.lng" readonly></el-input>
        </el-form-item>
        <el-form-item label="飞行高度">
          <el-input v-model="realTimeData.alt" readonly></el-input>
        </el-form-item>
        <el-form-item label="电量">
          <el-input v-model="realTimeData.elec" readonly></el-input>
        </el-form-item>
        <el-form-item label="云台俯仰角">
          <el-input v-model="realTimeData.pitch" readonly></el-input>
        </el-form-item>
        <el-form-item label="云台偏航角">
          <el-input v-model="realTimeData.heading" readonly></el-input>
        </el-form-item>
        <el-form-item label="巡检时间">
          <el-input v-model="realTimeData.time" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import UAVMap from "@components/realTimeVideo/components/UAVMap";
import LiveVideo from "@components/realTimeVideo/components/LiveVideo";
// import { endMqtt, initMqtt } from "@/tool/mqtt";
import { getTrace, flightWebSocket ,closeFlightWebSocket} from "@/api";
import storage from "@/utils/storage";
// import { creatWebSocket, closeWebSocket } from "../../utils/websocket.js";

import { mapState } from "vuex";
export default {
  name: "realTimeVideo",
  props: ["videoRow"],
  components: {
    // UAVMap,
    LiveVideo,
  },
  data() {
    return {
      form: {},
      realTimeData: {},
      zoomIS: false,
      address: "",
      right: 0,
      height: 457.5,
    };
  },
  computed: {
    ...mapState({
      websocketData: (state) => {return state.websocket.websocketData;},
    }),
  },
  watch: {
    websocketData(newData, oldData) {
      console.log("newData", newData);
      console.log("oldData", oldData);
      this.realTimeData=newData
      console.log(this.realTimeData);
    },
    // websocketData: {
    //   handler(newData, oldData) {
    //     console.log("newData", newData);
    //     console.log("oldData", oldData);
    //     this.form = { ...newData, ...this.form };
    //     console.log(this.form);
    //   },
    //   immediate: true
    // },
  },
  mounted() {
  
    this.videoRow && (this.form = this.videoRow);
    this.address = this.videoRow.taskType + "" + this.videoRow.taskId;
    // creatWebSocket();
    this.historicalTrack();
    console.log(this.form);
  },
  methods: {
    // 实时推送最新无人机坐标
    async historicalTrack() {
      return
    },
    // 关闭实时推送最新无人机坐标
    async closeReal(){
      return
    },

    videoScaling() {
      if (this.zoomIS) {
        this.$refs.LiveVideo.zoom({ width: "360", height: "202.5" });
      } else {
        let width = this.$refs.realMain.clientWidth - 275 * 2;
        let height = this.$refs.realMain.clientHeight - 40;

        this.$refs.LiveVideo.zoom({ width, height });
      }

      this.right = this.zoomIS ? 0 : 275;
      this.height = this.zoomIS ? 457.5 : 700;

      this.zoomIS = !this.zoomIS;
    },
  },
  destroyed() {
    this.closeReal()
    // closeWebSocket();
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label {
  font-size: 14px;
  color: #ffffff;
}

::v-deep .el-input__inner {
  color: #ffffff;
  background: rgba(0, 0, 0, 0);
  border: none;
  font-size: 14px;
}

::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 10px;

  .el-form-item__content {
    height: 28px;
  }
}

.realTimeVideo {
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  position: relative;

  .realLeft {
    width: 275px;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    z-index: 10;
    padding: 10px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .realRight {
    transition: all 0.3s;
    position: absolute;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    z-index: 10;
    width: 275px;
    right: 0;
    top: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .realMain {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;

    .realMainVideo {
      position: absolute;
      transition: all 0.3s;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .realMainVideoTitle {
        color: #ffffff;
        background-color: #1C71ED;
        padding: 0 10px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
