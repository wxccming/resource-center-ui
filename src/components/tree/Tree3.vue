<template>
  <div class="Tree3">
    <div class="Tree2Content">
      <vueScroll>
        <div class="TreeContent">
          <el-tree
            :data="treeData"
            :props="
              defaultProps
                ? defaultProps
                : { children: 'children', label: 'name'}
            "
            ref="Tree"
            :expand-on-click-node="false"
            :highlight-current='true'
            :default-expanded-keys="expanded ? expanded : []"
            node-key="id"
            @node-click="handleNodeClick"
          >
            <div
              slot-scope="{ node, data }"
              class="tree"
              :style="`width: ${width}px;`"
            >
              <div v-if="data.type === 1" class="type1">
                <img
                  class="icon"
                  @click.stop="childrenClick(node)"
                  :src="
                    require(`@/assets/img/${
                      data.children && data.children
                        ? node.expanded
                          ? 'minus-square2'
                          : 'plus-square2'
                        : 'minus-square2'
                    }.png`)
                  "
                />
                <span :style="{color:node.expanded?'#1C71ED':'#666666',fontSize:'14px'}">{{ data.name }}</span>
              </div>
              <div v-if="data.type === 2" class="type2">
                <div class="circularBox">
                  <div class="circular"></div>
                </div>
                <span :style="{color:'#666666',fontSize:'14px',marginLeft:'10px'}">{{ data.name }}</span>
              </div>
            </div>
          </el-tree>
        </div>
      </vueScroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree3",
  props: ["defaultProps", "treeData", "expanded", "width"],
  mounted() {
    if(this.treeData[0].children.length !== 0){
      this.$refs.Tree.setCurrentKey(this.treeData[0].children[0].id)
    }
  },
  methods: {
    childrenClick(node) {
      node.expanded = !node.expanded;
    },
    handleNodeClick(data) {
      // 添加判断  如果为树的父节点 则不调用节点点击方法
      let node=this.$refs.Tree.getNode(data);
      if(!node.expanded){
        this.$emit("nodeClick", data);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.Tree3 {
  width: 100%;
  height: 100%;

  .Tree2Content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .TreeContent {
      width: 100%;

      .tree {
        width: 100%;

        .type1 {
          width: 100%;
          height: 39px;
          display: flex;
          padding: 0 10px;
          align-items: center;
          //background: #f0f3f7;
          //border-bottom: 1px solid #ced7e6;

          .icon {
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }

          span {
            flex: 1;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 10px;
            -moz-user-select: none; /* Firefox私有属性 */
            -webkit-user-select: none; /* WebKit内核私有属性 */
            -ms-user-select: none; /* IE私有属性(IE10及以后) */
            -khtml-user-select: none; /* KHTML内核私有属性 */
            -o-user-select: none; /* Opera私有属性 */
            user-select: none; /* CSS3属性 */
          }
        }

        .type2 {
          width: 100%;
          display: flex;
          align-items: center;
          height: 36px;
          overflow: hidden;

          .circularBox {
            width: 14px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-left: 10px;

            .circular {
              width: 14px;
              height: 14px;

              &:before {
                content: "";
                width: 0;
                height: 100%;
                border-left: 1px dashed #1C71ED;
                top: 0;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
          span {
            flex: 1;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
::v-deep .el-tree-node__content {
  height: auto;
  padding: 0 !important;
}

::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
  display: none;
}

</style>
