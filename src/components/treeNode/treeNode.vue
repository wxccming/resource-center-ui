<template>
  <!-- 树组件结构 -->
  <div class="treeBox">
    <div class="TreeContent">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        ref="Tree"
        :expand-on-click-node="false"
        highlight-current
        :node-key="nodeKey"
        :default-expanded-keys="expanded ? expanded : []"
        @node-click="handleNodeClick"
      >
        <div slot-scope="{ node, data }" style="width: 100%">
          <div
            v-if="
              data.type == 0 ||
              data.type == 1 ||
              data.type == 2 ||
              data.type == 3 ||
              data.type == 5||
              data.type == 6
            "
            :class="`${
              data.type == 0
                ? 'one'
                : data.type == 1
                ? 'two'
                : data.type == 3
                ? 'three pad'
                : data.type == 5
                ? 'three line'
                : data.type == 6
                ? 'three tower'
                : 'three'
            }`"
          >
            <img
              src="@/assets/img/left.png"
              class="one-left"
              v-if="data.type == 0"
            />
            <img
              src="@/assets/img/right.png"
              class="one-right"
              v-if="data.type == 0"
            />
            <span>{{ node.label }}</span>

            <div
              v-show="data[childrenKey] && data[childrenKey].length"
              v-if="data.type == 1"
              class="two-icon"
              @click.stop="childrenClick(node, data)"
            >
              <i
                :class="`${node.expanded ? 'el-icon-minus' : 'el-icon-plus'}`"
              ></i>
            </div>
            <div
              v-if="data.type == 2 && !data.hidden"
              class="three-icon"
              @click.stop="() => childrenClick(node, data)"
            >
              <i
                :class="`${
                  node.expanded ? 'expanded' : ''
                } el-icon-caret-right`"
              ></i>
            </div>
            <div
              v-if="(data.type == 3 || data.type == 5) && !data.hidden"
              class="three-icon"
              @click.stop="() => childrenClick(node, data)"
            >
              <i
                :class="`${
                  node.expanded ? 'expanded' : ''
                } el-icon-caret-right`"
              ></i>
            </div>
          </div>
          <div
            v-else-if="data.type == 4"
            :id="node.data.id"
            :class="['line', data.status == 2 ? 'col' : '']"
          >
            <div class="loop" v-if="node.data.type == node.parent.data.type">
              <div
                class="circularBox"
                v-for="i in level(node, node.data.type)"
                :key="i"
              >
                <div
                  class="circular"
                  style="background: transparent; border: none"
                ></div>
              </div>
            </div>

            <div class="circularBox">
              <div class="circular"></div>
            </div>

            <span style="width: 126px">{{ node.label }}</span>
            <!-- v-show="data[childrenKey].length" -->
            <div
              class="icon"
              v-if="!data.noLineIcon"
              @click.stop="childrenClick(node, data)"
            >
              <i
                :class="`${
                  node.expanded ? 'expanded' : ''
                } el-icon-caret-right`"
              ></i>
            </div>
          </div>
          <div v-else-if="data.type == 4" class="tower">
            <div class="loop" v-if="node.data.type == 5">
              <div
                class="circularBox"
                v-for="i in level(node.parent, node.parent.data.type) + 1"
                :key="i"
              >
                <div class="circular"></div>
              </div>
            </div>

            <span
              :style="{
                color:
                  data.status == 0
                    ? ''
                    : data.status == 1
                    ? '#42AB4F'
                    : data.status == 2
                    ? '#D13838'
                    : '',
              }"
              >{{ node.label }}</span
            >

            <img
              v-if="lastNoIcon"
              :src="
                require(`@/assets/img/${
                  data[towerStatus] === 0
                    ? 'in'
                    : data[towerStatus] === 1
                    ? 'not'
                    : 'complete'
                }.png`)
              "
            />
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree",
  // props: ['defaultProps', 'treeData', 'expanded', 'towerStatus',"nodeKey","childrenKey"],
  props: {
    defaultProps: {
      default: () => ({ children: "children", label: "name" }),
    },
    treeData: {
      default: [],
    },
    expanded: {
      default: [],
    },
    towerStatus: {
      default: "",
    },
    nodeKey: {
      default: "id",
    },
    childrenKey: {
      default: "children",
    },
    lastNoIcon: {
      default: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    level(node, type) {
      let i = 0;

      function calculation(data) {
        if (!data.parent) return;

        if (!data.parent.data.length) if (data.data.type === type) i += 1;

        calculation(data.parent);
      }

      calculation(node);

      // 当前减一为同类型情况下只循环树形虚线
      return i - 1;
    },
    // 右侧按钮点击
    async childrenClick(node, data) {
      if (!node.expanded) {
        await this.$emit("treeExpandedClick", node, data);
      }
      node.expanded = !node.expanded;
    },
    // 动态设置树节点
    appendTree(node, data, treeData) {
      this.$nextTick(() => {
        // this.$refs.Tree.updateKeyChildren(node.id,treeData)
        treeData.forEach((v) => {
          this.$refs.Tree.append(v, node);
        });
        // if (!data[this.childrenKey]) {
        //   this.$set(data, this.childrenKey, []);
        // }
        // data[this.childrenKey] = treeData
        // console.log('data[this.childrenKey]',data,data[this.childrenKey]);
        this.$forceUpdate();
      });
    },
    // 节点点击
    handleNodeClick(data, node) {
      console.log("handleNodeClick", data);
      this.$emit("nodeClick", data, node);
    },
  },
};
</script>

<style lang="scss" scoped>
.treeBox {
  padding: 18px 10px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .TreeContent {
    width: 100%;
    height: 100%;
    overflow: auto;
    //background: skyblue;

    .col span {
      color: red !important;
    }
    ::v-deep .line {
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
          background: #3d82fd;
          border: 2px solid #3d82fd;
          border-radius: 50%;

          &:before {
            content: "";
            width: 0;
            height: 100%;
            border-left: 1px dashed #3d82fd;
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
        color: #3d82fd;
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

    ::v-deep .tower {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      padding-left: 44px;
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
            border-left: 1px dashed #3d82fd;
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

    ::v-deep .one {
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

    ::v-deep .two {
      width: 100%;
      height: 44px;
      // background: #3d82fd;
      padding: 0 18px;
      display: flex;
      align-items: center;
      border-bottom: #ffffff solid 1px;

      .two-icon {
        // color: #ffffff;
        position: absolute;
        right: 18px;
      }

      span {
        width: 218px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        // color: #ffffff;
        font-family: Microsoft YaHei;
        font-weight: bold;
        padding-right: 10px;
      }
    }

    ::v-deep .three {
      width: 100%;
      height: 40px;
      // background: #3d82fd;
      padding: 0 18px 0 29px;
      display: flex;
      align-items: center;
      border-bottom: #ffffff solid 1px;

      span {
        width: 207px !important;
      }

      .three-icon {
        // color: #ffffff;
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
        // color: #ffffff;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
    }
    .pad {
      padding: 0 18px 0 44px;
    }
    .line {
      padding: 0 18px 0 50px;
    }
    .tower {
      padding: 0 18px 0 55px;
    }
  }

  ::v-deep .TreeContent .el-tree-node__content {
    height: auto;
    padding: 0 !important;
  }

  ::v-deep .TreeContent .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
}
</style>
