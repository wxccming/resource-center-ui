<template>
    <el-table
      ref="multipleTable"
      v-loading="tableLoading"
      :data="tableData"
      element-loading-text="拼命加载中"
      :height="height"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(20, 60, 133, 0.8)"
      tooltip-effect="dark"
      style="width: 100%; "
      border
      :row-class-name="rowClassName"
      :header-cell-style="{ background: '#0e3372', color: '#cccccc' }"
      stripe
      @selection-change="handleSelectionChange"
    >
      <template v-if="isSelection">
        <el-table-column type="selection" width="55" />
      </template>
   
      <template v-for="(item,index) in column">
        <el-table-column
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :type="item.type"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable?true:false"
          :filters="item.filters"
          :column-key="item.columnKey"
          :filtered-value="item.filteredValue"
          :filter-multiple="item.filterMultiple"
          :min-width="item.minWidth"
          align="center"
        >
   
          <!-- <div class="123" v-if="item.type == ''"> -->
          <template v-if="item.hasOwnProperty('colunmTemplate')" :slot="item.colunmTemplate" slot-scope="scope">
            <slot v-if="item.theadSlot" :name="item.theadSlot" :row="scope.row" :index="index" />
          </template>
   
          <template slot-scope="scope">
            <!-- 插槽 -->
            <div v-if="item.dataType == 'slot'">
              <slot v-if="item.slot" :name="item.slot" :row="scope.row" :index="scope.$index" />
            </div>
   
   
            <!-- 进度条 -->
            <div v-else-if="item.dataType == 'progress'">
              <el-progress :percentage="Number(scope.row[item.prop])" />
            </div>
   
            <!-- tag -->
            <div v-else-if="item.dataType == 'tag'">
   
              <el-tag v-if="typeof dataTypeFn(scope.row[item.prop],item.formatData) == 'string'" :title="scope.row[item.prop] | formatters(item.formatData)" :type="formatType(scope.row[item.prop],item.formatType)">
                {{ scope.row[item.prop] | formatters(item.formatData) }}
              </el-tag>
   
              <el-tag v-for="(tag,index) in dataTypeFn(scope.row[item.prop],item.formatData)" v-else-if="typeof dataTypeFn(scope.row[item.prop],item.formatData) == 'object'" :key="index" :title="scope.row[item.prop] | formatters(item.formatData)" :type="formatType(tag,item.formatType)">
                {{ item.tagGroup ? tag[item.tagGroup.label]?tag[item.tagGroup.label]:tag : tag }}
              </el-tag>
   
              <el-tag v-else :title="scope.row[item.prop] | formatters(item.formatData)" :type="formatType(scope.row[item.prop],item.formatType)">
                {{ scope.row[item.prop] | formatters(item.formatData) }}
              </el-tag>
   
            </div>
   
            <!-- 按钮 -->
            <div v-else-if="item.dataType == 'option'">
              <el-button
                v-for="(o, key) in item.operation"
                v-show="o.showHide?o.showHide(scope.row):true"
                :key="key"
                :icon="o.icon | iconFn(scope.row)"
                :disabled="o.disabled?o.disabled(scope.row):false"
                :plain="o.plain"
                :type="o.type | typeFn(scope.row)"
                :size="o.size"
                @click="o.clickFun(scope.row)"
              >
                {{ o.name }}
              　　　　　 </el-button>
            </div>
   
            <!--  -->
   
            <!-- 默认纯展示数据 -->
            <div v-else>
              <span v-if="!item.formatData">{{ scope.row[item.prop] }}</span>
              <span v-else>{{ scope.row[item.prop] | formatters(item.formatData) }}</span>
            </div>
   
          </template>
   
          <!-- </div>   -->
   
        </el-table-column>
      </template>
   
    </el-table>
  </template>
   
  <script>
  export default {
    filters: {
      iconFn(val, row) {
        if (typeof (val) === 'function') {
          return val(row)
        } else return val
      },
      typeFn(val, row) {
        console.log(val,row,'11111111');
        if (typeof (val) === 'function') {
          return val(row)
        } else return val
      },
      describeConts(val, describeCont) {
        if (typeof (describeCont) === 'function') {
          return describeCont(val)
        } else return val
      },
      formatters(val, format) {
        if (typeof (format) === 'function') {
          return format(val)
        } else return val
      }
    },
    props: {
      isSelection: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: null
      },
      tableLoading: {
        type: Boolean,
        default: false
      },
      handleSelectionChange: {
        type: Function,
        default: () => {
          return () => {}
        }
      },
      headerCellStyle: {
        type: Object,
        default: () => {
          return {}
        }
      },
      column: {
        type: Array,
        default() {
          return [
          ]
        }
      },
      rowClassName: {
        type: Function,
        default: () => {
   
        }
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      }
    },
   
    methods: {
      formatType(val, format) {
        if (typeof (format) === 'function') {
          return format(val)
        } else return ''
      },
      dataTypeFn(val, format) {
        if (typeof (format) === 'function') {
          return format(val)
        } else return val
      }
    }
  }
  </script>
   
  <style scoped>
  span{
    white-space: pre-wrap;
  }
    /* .el-table .warning-row {
      background: oldlace;
    }
    .el-table .success-row {
      background: #f0f9eb;
    } */
   
  /* .app-container /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }
  .app-container /deep/ .el-table tr {
    background-color: transparent!important;
  }
  .app-container /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;
  } */
  </style>