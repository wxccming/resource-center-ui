<template>
  <!--树结构组件-->
  <div class="treeBox">
    <div class="search">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        clearable
        suffix-icon="el-icon-search"
      >
        <!-- <el-button
          v-preventReClick
          style="width: 60px"
          clearable
          slot="prepend"
          size="mini"
          ><i class="font iconfont icon-shaixuan"></i
        ></el-button> -->
      </el-input>
    </div>

    <!-- default-expand-all -->
    <el-tree
      class="tree"
      :data="treeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      node-key="code"
      :default-expand-all="expandAll"
      :default-expanded-keys="expanded"
      ref="tree"
    >
      <div slot-scope="{ node, data }" style="width: 100%" class="tree-item">
        <template v-if="type ? node.level == 1 : data.orgLevel == 1">
          <div class="level1" @click.stop="(event) => event.stopPropagation()">
            <img src="@/assets/img/left.png" />
            <div class="name">{{ data.name }}</div>
            <img src="@/assets/img/right.png" />
          </div>
        </template>
        <template v-else-if="type ? node.level == 2 : data.orgLevel == 2">
          <div
            :class="['level2', node.expanded ? 'level2Open' : '']"
            @click="(event) => nodeClick(node, data, event)"
          >
            <span :class="node.expanded ? 'clear' : 'open'"></span>
            <span class="name">{{ data.name }}</span>
          </div>
        </template>
        <template v-else-if="type ? node.level == 3 : data.orgLevel == 3">
          <div class="level3" @click="(event) => nodeClick(node, data, event)">
            <span :class="node.expanded ? 'clear' : 'open'"></span>

            <div>
              {{ data.name }}
            </div>
          </div>
        </template>
        <template v-else-if="type ? node.level == 4 : data.orgLevel == 4">
          <div class="banzu" @click="(event) => nodeClick(node, data, event)">
            <span :class="node.expanded ? 'clear' : 'open'"></span>

            <div>
              {{ data.name }}
            </div>
          </div>
        </template>
        <template v-else-if="type ? node.level == 5 : data.orgLevel == 5">
          <div class="level4" @click="(event) => nodeClick(node, data, event)">
            <i :class="['left', node.expanded ? 'open' : 'clear']"></i>
            <div :class="['name', node.expanded ? 'curent' : '']">
              {{ data.name }}
            </div>
          </div>
        </template>
        <template v-else-if="type ? node.level == 6 : data.orgLevel == 6">
          <div class="level5" @click="(event) => nodeClick(node, data, event)">
            <div :class="['name', clickColor == data.code ? 'curent' : '']">
              {{ data.name }}
            </div>
          </div>
        </template>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { findVoltage, selectRfHdLineTree } from "@/api/index";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Tree",
  props: {
    treeData: {
      level: Array,
      default: () => [],
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Array,
      default: () => ["10000"],
    },
    defaultProps: {
      default: () => ({ children: "tree", label: "name" }),
    },
    type: {
      default: false,
    },
  },
  data() {
    return {
      clickColor: "", // 点击选中颜色
      filterText: "",
    };
  },
  computed: {
    showTower() {
      return (
        this.$route.path == "/StandingBook/lineManage" ||
        this.$route.path == "/StandingBook/towerManage" ||
        this.$route.path == "/StandingBook/flightPathManage" || 
        this.$route.path == "/staging/dataHandling"
      );
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    ...mapMutations("treeNode", ["setTreeNode"]),
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    childrenClick() {},
    nodeClick(node, data, event) {
      // this.$bus.$emit("handerNode", node);
      // this.$store.commit('setTreeNode', node)
      // debugger
      this.setTreeNode(node);
      if (data.tree?.length) return;
      // this.$emit("nodeChange", node);
      if (data.orgLevel == "4") {
        if (!this.showTower) return;
        findVoltage({ code: data.code }).then((res) => {
          node.expanded = true;
          if (!res.data.length) return;
          res.data.forEach((ele) => {
            this.$refs.tree.append(ele, node);
          });

          // event.target.click();
        });
      } else if (data.orgLevel == "5") {
        selectRfHdLineTree({ code: data.code }).then((res) => {
          node.expanded = true;
          if (!res.data.length) return;
          res.data.forEach((ele) => {
            this.$refs.tree.append(ele, node);
          });

          // event.target.click();
        });
      } else if (data.orgLevel == "6") {
        this.clickColor = data.code;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.treeBox {
  // margin: 15px 0px;padding
  padding: 18px 10px 0;
}
.search {
  margin-bottom: 5px;
  display: flex;
}
::v-deep .el-input-group__prepend {
  border: 1px solid #6da2f2;
}
.tree {
  position: relative;
  width: 100%;
  height: 71.5vh;
  overflow: scroll;
  .tree-item {
    height: 40px;
    .level1 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      // margin-top: 20px;
      .name {
        line-height: 40px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      img {
        width: 16px;
        height: 16px;
        // background-color: #1877fd;
        margin: 0 10px;
      }
    }

    .level2 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      padding: 0 20px;
      // background: #3d82fd;
      background: #fefefe;
      color: #4a4a4b;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      // color: #fefefe;
      // border-bottom: 1px solid;
      .name {
        margin-left: 10px;
      }
      .open {
        position: relative;
        border: 1px solid #fff;
        display: inline-block;
        height: 10px;
        width: 10px;
        &::after {
          content: "+";
          height: 10px;
          display: inline-block;
          position: absolute;
          top: -6.5px;
          left: -1px;
        }
      }
      .clear {
        position: relative;
        border: 1px solid #fff;
        display: inline-block;
        height: 10px;
        width: 10px;
        &::after {
          content: "-";
          height: 10px;
          display: inline-block;
          position: absolute;
          top: -6.5px;
          left: 1px;
        }
      }
    }
    .level2Open {
      color: #fefefe;
      background: #3d82fd;
    }
    .level4 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      padding: 0 60px;
      .name {
        margin-left: 10px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        // color: #1C71ED;
        color: #a6a9ad;
      }
      .curent {
        color: #3d82fd;
      }
      .left {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .open {
        background-color: #3d82fd;
        border: 2px solid #a0bff3;
      }
      .clear {
        background-color: rgb(161, 161, 161);
        border: 2px solid rgb(213, 213, 213);
      }
    }
    .level5 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 63px;
      .name {
        width: 100%;
        height: 100%;
        border-left: 1px dashed #3d82fd;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 36px;
        padding-left: 30px;
      }
      .curent {
        color: #3d82fd;
      }
    }

    .level3 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      padding: 0 40px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #909295;
    }
    .banzu {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      padding: 0 50px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #909295;
    }
  }
}

::v-deep.tree .line {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 18px;

  .loop {
    height: 100%;
    display: flex;
  }

  .circularBox {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 10px;

    .circular {
      width: 10px;
      height: 10px;
      background: #0b9a96;
      border: 2px solid #18beba;
      border-radius: 50%;

      &:before {
        content: "";
        width: 0;
        height: 100%;
        border-left: 1px dashed #21a099;
        top: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  span {
    width: 100%;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 5px;
  }

  .icon {
    color: #038e89;
    position: absolute;
    right: 18px;

    i {
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
    }

    .expanded {
      transform: rotate(90deg);
    }
  }
}

::v-deep.tree .tower {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 28px;

  .loop {
    height: 100%;
    display: flex;
  }

  .circularBox {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 10px;

    &:last-child {
      margin-right: 22px;
    }

    .circular {
      width: 10px;
      height: 10px;
      background: transparent;
      border: 2px solid transparent;
      border-radius: 50%;

      &:before {
        content: "";
        width: 0;
        height: 100%;
        border-left: 1px dashed #21a099;
        top: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  span {
    font-size: 12px;
    color: #a1a0a0;
    width: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
  }

  img {
    width: 18px;
    height: 14px;
    margin-left: 10px;
  }
}

::v-deep.tree .one {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  overflow: hidden;
  position: relative;
  background: #ffffff;

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 19px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }

  .one-left {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 25px;
  }

  .one-right {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 25px;
  }
}

::v-deep.tree .two {
  width: 100%;
  height: 44px;
  background: #006864;
  padding: 0 18px;
  display: flex;
  align-items: center;
  border-bottom: #ffffff solid 1px;

  .two-icon {
    color: #ffffff;
    position: absolute;
    right: 18px;
  }

  span {
    width: 218px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: #ffffff;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-right: 10px;
  }
}

::v-deep.tree .three {
  width: 100%;
  height: 40px;
  background: #038e89;
  padding: 0 18px 0 29px;
  display: flex;
  align-items: center;
  border-bottom: #ffffff solid 1px;
  .el-tree-node__children {
    overflow-y: scroll;
  }
  span {
    width: 207px !important;
  }

  .three-icon {
    color: #ffffff;
    position: absolute;
    right: 18px;

    i {
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
    }

    .expanded {
      transform: rotate(90deg);
    }
  }

  span {
    padding-right: 5px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
}
::v-deep .el-tree-node__content {
  height: auto;
  padding: 0 !important;
}
::v-deep .tree > .el-tree-node > .el-tree-node__content {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #fff;
}

::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
  display: none;
}

@font-face {
  font-family: "iconfont"; /* Project id 3008375 */
  src: url("//at.alicdn.com/t/c/font_3008375_61t342fs9m7.woff2?t=1678434390919")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3008375_61t342fs9m7.woff?t=1678434390919")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3008375_61t342fs9m7.ttf?t=1678434390919")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  color: #1877fd;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shaixuan:before {
  content: "\e74a";
}
::v-deep .el-input-group__prepend {
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  // border-color: #1877FD;
}
</style>
