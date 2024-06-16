<template>
  <div class="table">
    <el-table
      :data="tableData"
      ref="multipleTable"
      highlight-current-row
      :header-cell-style="headClass"
      :row-key="getRowKey"
      lazy
      :height="tableHeight"
      :load="handleLoad"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @current-change="
        (current) => {
          handleCurrentChange ? handleCurrentChange(current) : null;
        }
      "
      @selection-change="
        (selections) => {
          handleSelectionChange ? handleSelectionChange(selections) : null;
        }
      "
    >
      <el-table-column
        v-if="TableConfig.isCheckAll"
        type="selection"
        :selectable="
          TableConfig.selectable ? TableConfig.selectable : () => true
        "
        :reserve-selection="true"
        width="50"
      >
      </el-table-column>

      <el-table-column
        v-if="TableConfig.isIndex"
        label="序号"
        type="index"
        :index="indexMethod"
        width="60"
      >
      </el-table-column>

      <el-table-column
        v-for="item in TableConfigColumns"
        :key="item.prop"
        :fixed="item.fixed"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="
          item.tooltip
            ? false
            : item.button
            ? true
            : item.actions
            ? false
            : item.input
            ? false
            : !item.select
        "
      >
        <template slot-scope="scope">
          {{
            item.tooltip
              ? null
              : item.formatter
              ? item.formatter(scope.row[item.prop], scope.row)
              : scope.row[item.prop]
          }}

          <el-popover v-if="item.tooltip" trigger="hover" placement="top">
            <div style="max-width: 300px">{{ scope.row[item.prop] }}</div>
            <div
              slot="reference"
              style="
                cursor: pointer;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              "
            >
              {{ scope.row[item.prop] }}
            </div>
          </el-popover>

          <!--    操作按钮    -->
          <div
            v-if="item.actions"
            style="display: flex; align-items: center; justify-content: center"
          >
            <!--isHidden 为 true 不显示该按钮-->
            <el-button
              type="text"
              v-for="but in item.actions"
              v-if="!but.isHidden"
              size="mini"
              :key="but.id"
               v-preventReClick
              v-hasPermission="item.permission ? item.permission : ''"
              @click="but.click(scope.row, scope.$index)"
              :disabled="but.disabled ? but.disabled(scope.row) : false"
            >
              {{
                typeof but.text === "string" ? but.text : but.text(scope.row)
              }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      :page-size="pages.pageSize"
      :current-page="pages.pageNum??0"
      layout="total, prev, pager, next"
      :total="pages.total ?? 0"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: [
    "pages",
    "tableData",
    "TableConfig",
    "tableStyle",
    "getRowKey",
    "handleLoad",
    "handleCurrentChange",
    "handleSelectionChange",
    "tableHeight",
  ],
  computed: {
    TableConfigColumns() {
      return this.TableConfig.columns
        .filter((item) => item)
        .map((item) =>
          item.actions
            ? {
                ...item,
                actions: item.actions.filter((item) => item),
              }
            : item
        );
    },
  },
  methods: {
    indexMethod(index) {
      return (this.pages.pageNum - 1) * this.pages.pageSize + (index + 1);
    },
    currentChange(index) {
    console.log(index);
    this.$emit('currentChange',index)
    },
    // 表头样式设置
    headClass() {
      return `
              font-size: 1.3rem;
              font-family: Microsoft YaHei;
              font-weight: 600;
              color: #333333;
              height: 2rem;
              line-height: 2rem;
              padding: 8px 0;
              background: #F7FAFF;
              `;
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93%;
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
}
::v-deep .el-table__row {
  height: 4rem;
}
::v-deep .el-table {
  overflow: scroll;
}
</style>
