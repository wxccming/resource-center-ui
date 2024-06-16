<template>
  <div class="Search">
    <div class="title" v-if="pageTitle">
      {{ pageTitle }}
      <slot name="title"></slot>
    </div>

    <div class="contents">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="mini"
        label-width="85px"
        label-position="right"
      >
        <el-form-item
          v-for="item in SearchConfigList"
          :key="item.id"
          :label="`${item.label ? item.label+':':''}`"
        >
          <el-input
            v-if="item.type === 'input'"
            v-model="formInline.data[item.prop]"
            :placeholder="`${
              item.placeholder ? item.placeholder : '请输入' + item.label
            }`"
            style="width: 300px"
            :clearable="item.clearable ? item.clearable(true) : true"
          >
            <div class="screeningInput" slot="prepend">
              <div class="title" v-if="pageTitle">
                {{ pageTitle }}
              </div>
              <el-button
                v-else
                v-preventReClick
                style="width: 60px"
                clearable
                size="mini"
                @click="screening"
                >筛选 <i class="font iconfont icon-shaixuan"></i
              ></el-button>
            </div>
          </el-input>
          <el-input
            v-if="item.type === 'input2'"
            v-model="formInline.data[item.prop]"
            :placeholder="`${
              item.placeholder ? item.placeholder : '请输入' + item.label
            }`"
            :style="`${item.width ? item.width : 'width:300px'}`"
            clearable
          >
          </el-input>

          <el-date-picker
            v-if="item.type === 'dateTime'"
            v-model="formInline.data[item.prop]"
            :type="item.dataType ? item.dataType : 'date'"
            placeholder="选择日期"
            style="width: 300px"
            :value-format="item.format ? item.format : 'yyyy-MM-dd'"
          ></el-date-picker>

          <el-date-picker
            style="width: 300px"
            v-if="item.type === 'dateTimeRange'"
            v-model="formInline.data[item.prop]"
            :range-separator="item.centerText ?? ''"
            :type="item.dataType ? item.dataType : 'daterange'"
            :value-format="item.format ? item.format : 'yyyy-MM-dd'"
            :start-placeholder="item.text ? item.text + '开始日期' : '开始日期'"
            :end-placeholder="item.text ? item.text + '结束日期' : '结束日期'"
          >
          </el-date-picker>

          <el-date-picker
            style="width: 300px"
            v-if="item.type === 'dateTimeRangeMerange'"
            v-model="formInline.data[item.prop]"
            :type="item.dataType ? item.dataType : 'datetimerange'"
            :value-format="item.format ? item.format : 'yyyy-MM-dd HH-mm-ss'"
            :start-placeholder="item.text ? item.text + '开始日期' : '开始日期'"
            :end-placeholder="item.text ? item.text + '结束日期' : '结束日期'"
          >
          </el-date-picker>
          <el-select
            v-if="item.type === 'select'"
            v-model="formInline.data[item.prop]"
            :placeholder="`${
              item.placeholder ? item.placeholder : '请选择' + item.label
            }`"
            :style="`${item.width ? item.width : 'width:300px'}`"
            @change="(val) => item.change && item.change(val)"
            :clearable="'noClearable' in item ? false : true"
          >
            <el-option
              v-for="option in item.option"
              :key="option.id"
              :label="option.text"
              :value="option.id"
            ></el-option>
          </el-select>

          <el-upload
            v-if="item.type === 'upload'"
            :multiple="item.multiple ? item.multiple : false"
            :ref="'searchUpload' + item.key"
            action=""
            :disabled="item.disabled ? true : false"
            :auto-upload="false"
            :show-file-list="false"
            :accept="item.accept ? item.accept : 'image/*'"
            :on-change="
              (file, fileList) => {
                item.onChange(file, fileList);
              }
            "
          >
            <el-button
              :icon="item.icon"
              plain
              type="primary"
              style="margin-left: 10px"
              >{{ item.text }}</el-button
            >
          </el-upload>

          <!--          <el-button
            type="text"
            v-if="item.type === 'text'"
            v-hasPermission="item.permission ? item.permission : ''"
          >
            {{ item.text }}
          </el-button>-->

          <el-button
            :plain="!item['plain']"
            type="primary"
            size="small"
            :icon="item.icon"
            v-if="item.type === 'button' && !item.isHiden"
            v-hasPermission="item.permission ? item.permission : ''"
            @click="
              item.parameter
                ? item.click(item.parameter)
                : item.click(formInline)
            "
          >
            {{ item.text }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["pageTitle", "formInline", "SearchConfig"],
  computed: {
    SearchConfigList() {
      return this.SearchConfig ? this.SearchConfig.filter((item) => item) : [];
    },
  },
  methods: {
    screening() {
      this.$emit("screening");
    },
  },
};
</script>

<style scoped lang="scss">
.Search {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  background: #ffffff;
  border: 1px solid #999;
  padding: 15px 0 0 0;

  .title {
    font-size: 18px;
    margin-left: 25px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #49a18b;
  }
  .screeningInput {
    ::v-deep .el-button--mini {
      color: #49a18b;
      padding: 6px 10px;
    }
  }
  .demo-form-inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap !important;
    .el-button {
      height: 34.2px;
    }
  }
}

.el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
::v-deep .el-range-editor--mini.el-input__inner {
  height: 34.2px;
  border: 1px solid rgba(153, 165, 187, 0.7);
}
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 20px;
  height: 34.2px;
  border: 1px solid rgba(153, 165, 187, 0.7);
}
::v-deep .el-input--mini .el-input__icon {
  color: #49a18b;
}
::v-deep .el-input-group__prepend {
  background-color: #fff;
  border: 1px solid rgba(153, 165, 187, 0.7);
  border-right: none;
}
::v-deep .el-form--inline .el-form-item {
  margin-bottom: 20px;
}

@font-face {
  font-family: "iconfont"; /* Project id 2508375 */
  src: url("//at.alicdn.com/t/c/font_2508375_61t342fs9m7.woff2?t=1678434390919")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_2508375_61t342fs9m7.woff?t=1678434390919")
      format("woff"),
    url("//at.alicdn.com/t/c/font_2508375_61t342fs9m7.ttf?t=1678434390919")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shaixuan:before {
  content: "\e74a";
}
.el-select{
  width: 272px;
}

/*

 >>>  .el-input__inner {
  border: 1px solid #3581A7;
}
*/
</style>
