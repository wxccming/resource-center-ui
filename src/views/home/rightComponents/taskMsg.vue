<template>
  <!-- 实时任务信息 -->
  <div style="color: #fff">
    <commonTit title="实时任务信息"/>

    <el-row :gutter="20" style="margin-top: 0.8rem">
      <el-col :span="12" class="conItem">
        <div class="tit">任务编号</div>
        <div class="contxt" :title="taskData.taskId">{{ taskData.taskId }}</div>
      </el-col>
      <el-col :span="12" class="conItem">
        <div class="tit">无人机型号</div>
        <div class="contxt" :title="taskData.uavModelName">{{ taskData.uavModelName }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="conItem">
        <div class="tit">作业单位</div>
        <div class="contxt" :title="taskData.orgName">{{ taskData.orgName }}</div>
      </el-col>
      <el-col :span="12" class="conItem">
        <div class="tit">专业人员</div>
        <div class="contxt">{{ taskData.inspectionName }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" class="conItem larg">
        <div class="tit">联系电话</div>
        <div class="contxt">{{ taskData.mobile }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commonTit from "./title"

export default {
  components: {commonTit},
  props:["taskData"],
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.conItem{
  background: url("~@/assets/img/组 2662.png") no-repeat;
  background-position: 8px;
  line-height: 35px;
  margin-bottom: 0.8rem;
  &.larg{
    background: url("~@/assets/img/组 2663.png") no-repeat;
  }
}
.tit{
  width: 97px;
  height: 35px;
  background: url("~@/assets/img/底框.png") no-repeat;
  background-size: 100% 100%;
  float: left;
  text-align: center;
}
.contxt{
  float: right;
  width: calc(100% - 100px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
