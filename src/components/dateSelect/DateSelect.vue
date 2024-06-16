<template>
<div>
  <!-- <el-select class="dateSelectStyle" v-model="dateSelect" placeholder="请选择">
    <el-option label="本周" value="1"></el-option>
    <el-option label="本月" value="2"></el-option>
    <el-option label="本年" value="3"></el-option>
  </el-select> -->
</div>
</template>

<script>
export default {
  name: "DateSelect",
  props:{
    dateSelect:{
      type:String,
      default:'1'
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style lang="scss" scoped>
.dateSelectStyle{
  width: 8.2rem;
  height: 3.2rem;
  box-shadow: 0px 4px 12px 0px rgba(101,151,252,0.36);
  border-radius: 8px;
  ::v-deep .el-input__inner{
    background: linear-gradient(-90deg, #6597FC 0%, #8FCFFF 100%);
    color: #ffffff;
    border: unset;
  }
  ::v-deep .el-input__icon{
    height: 4rem;
    position: relative;
    top:-3px;
  }
  ::v-deep .el-select__caret{
    color:#ffffff;
  }
}
</style>
