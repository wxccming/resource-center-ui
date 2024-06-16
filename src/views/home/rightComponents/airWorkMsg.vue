<template>
  <!-- 实时飞机作业信息 -->
  <div style="color: #fff">
    <commonTit title="实时飞机作业信息"/>
    <div class="UAVBox">
      <div class="boxMsg yuntai">
        <span style="color: #01E6B9;">{{ taskData.pitch }}°</span>
        <span class="label">云台角度</span>
      </div>
      <div class="uavImg">
        <img  src="@/assets/img/无人机.png">
        <div style="text-align: center">{{ taskData.uavModelName }}</div>
      </div>
      <div class="boxMsg jitou">
        <span style="color: #01E6B9;">{{taskData.heading}}°</span>
        <span class="label">机头朝向</span>
      </div>
    </div>
    <div class="UAVFlyMsg">
      <div>
        <img src="@/assets/img/飞行高度.png">
        <div>飞行高度：<span>{{taskData.alt}}m</span></div>
      </div>
      <div>
        <img src="@/assets/img/实时位置.png">
        <div>实时位置：<span :title="taskData.lng+';'+taskData.lat">{{ taskData.lng }};{{ taskData.lat }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import commonTit from "./title"

export default {
  props:["taskData"],
  components: {commonTit},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.UAVBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
}

.boxMsg {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  flex: 1;
  .label{
    color: #01C3AC;
    background: rgba(27, 96, 79, 0.5);
    padding: 3px 8px;
  }
  &.yuntai{
    align-self: flex-end;
    &::after{
      content: '';
      position: absolute;
      width: 40px;
      height: 0;
      border-top: 2px solid #24A4C0;
      right: 25px;
      top: 2px;
      transform: rotate(-45deg);
    }
  }
  &.jitou{
    align-self: flex-start;
    top: -8px;
    &::before{
      content: '';
      position: absolute;
      width: 40px;
      height: 0;
      border-top: 2px solid #24A4C0;
      left: 13px;
      top: 10px;
    }
  }
}
.uavImg{
  position: relative;
  &::before{
    content: '';
    position: absolute;
    width: 40px;
    height: 0;
    border-top: 2px solid #24A4C0;
    left: -30px;
    top: 18px;
  }
  &::after{
    content: '';
    position: absolute;
    width: 35px;
    height: 0;
    border-top: 2px solid #24A4C0;
    right: -20px;
    top: 17px;
    transform: rotate(-55deg);
  }
}
.UAVFlyMsg{
  display: flex;
  justify-content: space-around;
  margin: 8px 0;
  white-space: nowrap;
  >div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img{
      margin-bottom: 8px;
    }
    span{
      display: inline-block;
      color: #01E6B9;
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
