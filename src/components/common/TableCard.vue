<template>
  <div class="tabel">
    <!-- Math.ceil(parameter.length / column) -->
    <div class="box-top" v-for="v in parameter.length<3 ? 1 : 2" :key="v">
      <el-table
        :data="tabelData"
        style="width: 100%"
        border
        :header-cell-style="headClass"
        :cell-style="rowStyle"
      >
        <el-table-column label="" prop="type" width="65px" style="padding: 0">
        </el-table-column>
        <el-table-column
          :min-width="getWidth(item.orgName)"
          v-for="item in getData(v)"
          :key="item.orgCode"
          :prop="item.orgCode"
          :label="item.orgName"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- <div
      class="box-top"
      v-for="item in Math.ceil(parameter.length / column)"
      :key="item"
    >
      <div class="tr title">
        <div class="th"></div>
        <div class="td">{{ title }}</div>
      </div>
      <div
        class="tr"
        v-for="index in column"
        :key="parameter[(item - 1) * column + index - 1].orgCode"
        v-if="parameter[(item - 1) * column + index - 1]"
      >
        <div class="th bg-color">
          {{ parameter[(item - 1) * column + index - 1][config.label] }}
        </div>
        <div class="td">
          {{ parameter[(item - 1) * column + index - 1][config.value] }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "TableCard",
  props: {
    column: {
      type: Number,
      default: 7,
    },
    parameter: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      tabelData: [],
    };
  },
  watch: {
    parameter: {
      immediate: true,
      handler(newValue) {
        let data = { type: this.title };
        newValue?.forEach((ele) => {
          if (this.title == "无人机") {
            data[ele.orgCode] = ele.uavNum;
          } else {
            data[ele.orgCode] = ele.airdromeSum;
          }
        });
        this.tabelData = [data];
      },
    },
  },
  methods: {
    // 第一列颜色
    rowStyle({ row, column, rowIndex, columnIndex }) {
      if (column.label == "") {
        return {
          height: "4rem",
          width: "max-content",
          background: "#F7FAFF",
        };
      } else return { height: "4rem", width: "max-content" };
    },
    getData(item) {
      let parameter = this.parameter
      if (parameter.length < 3) return this.parameter
      if (item == 1) {
        return parameter.slice(0, Math.floor(parameter.length / 2));
      } else {
        return parameter.slice(
          Math.floor(parameter.length / 2),
          parameter.length
        );
      }
    },
    getWidth(item) {
      if (item.length > 5) {
        return '88px'
      } else {
        return '42px'
      }
    },
    // 表头样式设置
    headClass(data) {
      let color = "#F7FAFF";
      return `
              font-size: 1.3rem;
              font-family: Microsoft YaHei;
              font-weight: 600;
              color: #333333;
              width: max-content;
              height: 4rem;
              line-height: 2rem;
              padding: 8px 0;
              background: ${color};
              `;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.tabel {
  .box-top,
  .box-bom {
    display: flex;
    justify-content: flex-start;
    .bg-color {
      background-color: #eff0f3;
    }
    .tr {
      // flex: 1;
      .td,
      .th {
        display: flex;
        justify-content: center;
        align-content: center;
        font-size: 14px;
        width: 42px;
        height: 37px;
        border: 1px solid #000;
      }
    }
  }
}
::v-deep .el-table th.el-table__cell > .cell {
  padding: 0;
}
</style>
