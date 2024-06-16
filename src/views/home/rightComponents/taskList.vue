<template>
  <!-- 巡检任务列表 -->
  <div style="height:calc(100% - 62.5rem)">
    <commonTit title="巡检任务列表"/>
    <div class="tableWrap" id="tableEl">
      <el-table ref="taskTable" :data="tableData" :height="tableHeight" class="tabBox"
                :header-cell-style="headerCellStyle"
                :cell-style="cellStyle" @row-click="handleRowClick" :highlight-current-row="true"
                :current-row-key="currentRowKey">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column v-for="(col,ind) in tabColumns" :key="ind" :prop="col.prop" :label="col.label">
          <template slot-scope="scope">
            <el-popover v-if="col.tooltip" trigger="hover" placement="top">
              <div style="max-width: 300px">{{ scope.row[col.prop] }}</div>
              <div slot="reference" class="tooltip">
                {{ scope.row[col.prop] }}
              </div>
            </el-popover>
            <span class="tabBtn" v-else-if="col.type=='btn'"
                  @click.stop="col.click(scope.row,$event)" type="text">{{ col.text }}
            </span>
            <span v-else class="tooltip">{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <el-empty :image-size="80" :image="emptyImg">
            <template slot="description"><span></span></template>
          </el-empty>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import commonTit from "./title"
import {findTaskList} from "@/api";
import {creatWebSocket, closeWebSocket} from "@/utils/websocket"
import {getAssetsIcon} from "@/utils/getAssetsIcon";
// creatWebSocket()

export default {
  components: {commonTit},
  data() {
    return {
      emptyImg: getAssetsIcon('nodata.png'),
      tableData: [],
      tabColumns: [
        {prop: 'taskName', label: '任务名称'},
        {prop: 'maintainName', label: '巡视类型'},
        {
          prop: 'taskId', type: 'btn', text: '详情', label: '任务详情', click: (row, event) => {
            event.stopPropagation();
            this.$emit('showTaskInfo', row)
            // console.log('row,ind', row)
          }
        },
      ],
      tableHeight: 100,
      currentRowKey: null, // 选中行
      historyTaskId: ''
    }
  },
  computed: {
    headerCellStyle() {
      return {background: '#0D4B42', color: '#fff', borderColor: '#1D2D1E', height: '3rem'};
    },
    cellStyle() {
      return {background: '#1A392D', color: '#fff', borderColor: '#1D2D1E', height: '3rem'};
    },
  },
  methods: {
    handleRowClick(row) {
      // 点击行根据任务 关闭并重新创建socket
      console.log('点击的行数据:', row);
      let taskIdMsg = {
        nowTaskId: row.id,
        historyTaskId: this.historyTaskId
      }
      this.historyTaskId = row.id
      this.currentRowKey = row.id
      // creatWebSocket(taskIdMsg)
        this.$emit('taskChooseMsg', row)
      // this.$bus.$emit('taskChooseMsg', row) // 兄弟组件传值
    },
    // 获取进行中任务列表
    getTaskList() {
      let obj = {
        completeStatus: 1,
        pageNum: 1,
        pageSize: 20
      }
      findTaskList(obj).then((res) => {
        if (res.code != "000000") return;
        this.tableData = res.data ?? [];
        // if (this.tableData.length) {
        //   this.$refs.taskTable.setCurrentRow(this.tableData[0]);
        //   this.handleRowClick(this.tableData[0])
        // } else this.$bus.$emit('taskChooseMsg', null)
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      let div = document.getElementById("tableEl");
      this.tableHeight = div.offsetHeight
    })
    this.getTaskList()
  },
  beforeDestroy() {
    // closeWebSocket()
  }
}
</script>

<style lang="scss" scoped>
.tableWrap {
  width: 100%;
  height: calc(100% - 4rem);
}

.tabBox {
  width: 100%;
  margin: 8px 0;
  background: transparent;

  .tabBtn {
    color: #fff;
    cursor: pointer;
  }
}

::v-deep .el-table::before {
  background: transparent;
}

::v-deep .el-table__row.current-row {
  /* 设置选中行的背景色 */
  background-color: #008d6a !important; /* 举例的背景色 */
  > td.el-table__cell {
    background-color: #008d6a !important; /* 举例的背景色 */
  }
}

::v-deep .el-empty__description {
  margin: 0;

  p {
    line-height: 30px;
    color: #fff;
  }
}

.tooltip {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
