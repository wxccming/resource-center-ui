<template>
  <div class="mapWarp">
    <div id="UAVMap"></div>
  </div>
</template>

<script>
import {initMap} from "@/utils/tool";

export default {
  name: "UAVMap",
  data() {
    return {
      is: false
    }
  },
  mounted() {
    this.viewer = initMap('UAVMap');
    // console.log('UGIS--video',UGIS)
    this.target = new UGIS.MovingTarget(this.viewer);
  },
  methods: {
    move({id = 1, imageUrl = require('@/assets/icon/UVA.png'), lon, lat}) {
      let target = [{id, imageUrl, lon, lat}];
      this.target.addData(target);
      if (this.is) return;
      this.is = true;
      this.flyTo({lon, lat});
    },
    // 飞到某个经纬度上
    flyTo({lon, lat, h = 500}) {
      this.viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, h),
      });
    }
  }
}
</script>

<style scoped lang="scss">
.mapWarp {
  width: 100%;
  height: 100%;
  position: relative;

  ::v-deep #navigationDiv {
    display: none;
  }

  #UAVMap {
    width: 100%;
    height: 100%;
  }
}
</style>
