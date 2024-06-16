<template>
  <div class="Tree2">
    <div class="Tree2Content">
      <vueScroll>
        <div class="TreeContent">
          <el-tree
            :data="treeData"
            :props="
              defaultProps
                ? defaultProps
                : { children: 'children', label: 'name' }
            "
            ref="Tree"
            :expand-on-click-node="false"
            highlight-current
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
                <span>{{ data.name }}</span>
              </div>
              <div v-if="data.type >= 2 && data.type <= 7" class="type2">
                <div class="circularBox">
                  <div class="circular"></div>
                </div>
                <div class="line" :style="`width: ${15 * data.type}px`">
                  <div class="circular"></div>
                </div>
                <span>{{ data.name }}</span>
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
  name: "Tree2",
  props: ["defaultProps", "treeData", "expanded", "width"],
  methods: {
    childrenClick(node) {
      node.expanded = !node.expanded;
    },
    handleNodeClick(data,node) {
      this.$emit("nodeClick", data,node);
    },
  },
};
</script>

<style scoped lang="scss">
.Tree2 {
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
                border-left: 1px dashed #28c8b8;
                top: 0;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }

          .line {
            width: 15px;
            height: 100%;
            margin-right: 5px;

            .circular {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;

              &:before {
                content: "";
                width: 100%;
                height: 0;
                border-top: 1px dashed #28c8b8;
                top: 50%;
                position: absolute;
                left: 0;
                transform: translateY(-50%);
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
