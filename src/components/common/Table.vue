<template>
  <div>
    <div class="btnbox">
      <div class="conbtn" v-for="item in SearchbtnList" :key="item.id">
        <el-button
          :plain="!item['plain']"
          :type="item.types"
          size="small"
          :icon="item.icon"
          v-if="item.type === 'button' && !item.isHiden"
          v-hasPermission="item.permission ? item.permission : ''"
          @click="
            item.parameter ? item.click(item.parameter) : item.click()
          "
        >
          {{ item.text }}
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      :cell-style="rowClass"
      :row-style="rowStyle"
      :header-cell-style="headClass"
      highlight-current-row
      :style="`width: 100%;${tableStyle}`"
      :row-key="getRowKey"
      lazy
      :class="this.headerColor ? 'headerColor' : ''"
      @row-click="(data) => $emit('rowClick', data)"
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
        fixed
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
        width="50"
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
        :filters="item.filters"
        :filtered-value="item.filteredValue"
        :filter-multiple="item.filterMultiple"
      >
        <template slot-scope="scope">
          <div v-if="item.dataType == 'tag'">
            <el-tag
              v-if="
                typeof dataTypeFn(scope.row[item.prop], item.formatData) ==
                'string'
              "
              :title="scope.row[item.prop] | formatters(item.formatData)"
              :type="formatType(scope.row[item.prop], item.formatType)"
            >
              {{ scope.row[item.prop] | formatters(item.formatData) }}
            </el-tag>
            <div v-else-if="
                  typeof dataTypeFn(scope.row[item.prop], item.formatData) ==
                  'object'
                ">
              <el-tag
                v-for="(tag, index) in dataTypeFn(
                  scope.row[item.prop],
                  item.formatData
                )"
                class="tagPad"
                :key="index"
                :title="scope.row[item.prop] | formatters(item.formatData)"
                :type="formatType(tag, item.formatType)"
              >
                {{
                  item.tagGroup
                    ? tag[item.tagGroup.label]
                      ? tag[item.tagGroup.label]
                      : tag
                    : tag
                }}
              </el-tag>
            </div>

            <el-tag
              v-else
              :title="scope.row[item.prop] | formatters(item.formatData)"
              :type="formatType(scope.row[item.prop], item.formatType)"
            >
              {{ scope.row[item.prop] | formatters(item.formatData) }}
            </el-tag>
          </div>

          <div
            v-else-if="!item.actions"
            :style="item.style && item.style(scope.row)"
            @dblclick="() => item.dblclick && item.dblclick(scope.row)"
          >
            <el-image
              v-if="item.type == 'img'"
              style="width: 100px; height: 50px"
              :src="scope.row[item.prop]"
              :preview-src-list="[scope.row[item.imgs ?? item.prop]]"
              @click="imageClick(scope.row)"
            >
              <template slot="error">
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    background: #f5f7fa;
                    height: 100%;
                    line-height: 3.5;
                  "
                >
                  暂无照片
                </div>
              </template>
            </el-image>
            <span
              v-else
              class="text"
              @click="() => item.click && item.click(scope.row)"
              style="display: inline-block; height: 2.5rem"
            >
              {{
                item.tooltip
                  ? null
                  : item.formatter
                  ? item.formatter(scope.row[item.prop], scope.row)
                  : scope.row[item.prop]
              }}
            </span>
          </div>

          <el-popover v-else-if="item.tooltip" trigger="hover" placement="top">
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
            <template v-for="but in item.actions">
              <el-button
                type="text"
                v-if="!but.isHidden && but.type !== 'dropdown' && but.type !== 'delete'"
                v-preventReClick
                v-show="'show' in but ? but.show(scope.row) : true"
                size="mini"
                :key="but.id"
                v-hasPermission="but.permission ? but.permission : ''"
                @click="but.click(scope.row, scope.$index)"
                :disabled="but.disabled ? but.disabled(scope.row) : false"
              >
                {{
                  typeof but.text === "string" ? but.text : but.text(scope.row)
                }}
              </el-button>
              <el-popconfirm
                v-else-if="but.type == 'delete'"
                :key="but.id"
                @confirm="but.click(scope.row, scope.$index)"
                title="确定删除？"
                style="margin-left: 15px"
              >
                <el-button
                  type="text"
                  size="mini"
                  :disabled="but.disabled ? but.disabled(scope.row) : false"
                  v-hasPermission="but.permission ? but.permission : ''"
                  slot="reference"
                >删除</el-button>
              </el-popconfirm>
              <el-dropdown
                v-else
                @command="
                  (id) => but.handleCommand && but.handleCommand(id, scope.row)
                "
              >
                <span class="el-dropdown-link"> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="v in but.options(scope.row)"
                    :key="v.id"
                    v-hasPermission="v.permission ? v.permission : ''"
                    :command="v.id"
                    >{{ v.text }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: [
    "tableData",
    "TableConfig",
    "pageSize",
    "pageNum",
    "tableStyle",
    "getRowKey",
    "handleLoad",
    "handleCurrentChange",
    "handleSelectionChange",
    "tableHeight",
    "headerColor",
    "rowStyle",
    "selection",
    "SearchbtnList",
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
  mounted() {
    this.toggleSelection();
  },
  methods: {
    dataTypeFn(val, format) {
      if (typeof format === "function") {
        return format(val);
      } else return val;
    },

    toggleSelection() {
      if (this.selection && this.selection.length > 0) {
        this.selection.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    imageClick(row) {
      this.$nextTick(() => {
        let ele = document.querySelector(
          ".el-image-viewer__wrapper .el-image-viewer__canvas"
        );
        ele?.setAttribute(
          "data-content",
          `${row?.imagesLat || ""}\n${row?.imagesLon || ""}\n${
            row?.imagesName || ""
          }`
        );
      });
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + (index + 1);
    },
    // 表头样式设置
    headClass() {
      return `text-align: center;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              ${this.headerColor ? "color: #FEFEFE;" : "color: #333333;"}
              line-height: 16px;
              padding: 8px 0;
              ${
                this.headerColor
                  ? "background: rgba(1,2,1,0);"
                  : "background: #F7FAFF;"
              }
              `;
    },
    // 表格样式设置
    rowClass({ row, column, rowIndex, columnIndex }) {
      let Left = false;
      if (this.TableConfig.alignLeft)
        Left = this.TableConfig.alignLeft.some((item) => item === column.label);
      return `${
        Left ? "" : "text-align: center;"
      }font-size: 14px;color: #666666;padding: 6px 0;border-bottom:1px solid rgba(66,185,130,0.12)`;
    },
    formatType(val, fn) {
      if(!fn) return val; 
      return fn(val);
    }
  },
};
</script>

<style scoped lang="scss">
//给固定列设置下边距
.el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 8px !important; //具体值是多少根据你横向滚动条的高度进行设置
  }
}
.el-table__fixed::before,
.el-table__fixed-right::before {
  display: none;
}

>>> .el-table__body-wrapper {
  z-index: 2;
}
.el-dropdown {
  display: flex;
}

.el-dropdown-link {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("~@/assets/img/table-select.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
}
</style>
<style>
.headerColor .el-table__header-wrapper thead tr {
  background: linear-gradient(181deg, #3e60d1, #68befe);
}
.el-scrollbar__wrap::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.btnbox {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}
.conbtn {
  margin-right: 10px;
}
.tagPad {
  margin: 0 4px;
}
</style>
