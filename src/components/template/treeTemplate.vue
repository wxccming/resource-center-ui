<template>
  <div class="treeTemplate">
    <div class="treeLeft">
      <Tree
        :treeData="treeData"
        :defaultProps="defaultProps"
        :expanded="expanded"
      ></Tree>
    </div>

    <div class="pageMain">
      <div class="center">
        <div class="search" ref="search">
          <span class="inputSear">
            <slot class="input" name="Search"></slot>
          </span>
        </div>
        <div class="centerData">
          <slot name="centerData"></slot>
        </div>
      </div>
      <div class="right">
        <slot name="rightData"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from "@/components/tree/Tree";
import { findAllorgList, findRfHdLineList } from "@/api/index";
export default {
  name: "treeTemplate",
  components: { Tree, },
  data() {
    return {
      defaultProps: { children: "tree", label: "name" },
      treeData: [],
      expanded: []
    };
  },
  mounted() {
    findAllorgList({ parentId: "0" }).then((res) => {
      this.treeData = [res.data] ?? [];
      this.expanded = [res.data.code]
    });
  },
  methods: {
    nodeChange(node) {
      this.$bus.$emit("handerNode", node);
    },
  },
};
</script>

<style scoped lang="scss">
.treeTemplate {
  width: 100%;
  height: 100%;
  display: flex;
  background: #e5e9fa;
}
.treeLeft {
  width: 24%;
  background: #ffffff;
  margin-right: 1rem;
  border-radius: 4px;
  margin-left: 0.6rem;
}
.pageMain {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // padding: 20px 10px;
  background: #e5e9fa;

  .center {
    // width: 70%;
    background-color: #fff;
    margin-right: 1rem;
    flex: 1;
  border-radius: 4px;

    // box-shadow: 0px 0px 35px 0px rgba(160, 170, 199, 0.5);
    // opacity: 0.94;
    .search {
      width: 96%;
      height: 6%;
      display: flex;
      justify-content: flex-end;
      margin: 0.5rem 2rem;
      //border-bottom: 1px solid rgb(228, 231, 237);
      align-items: center;
      .inputSear {
        display: flex;
        height: 35px;
        align-items: center;
        // width: 30%;
        // line-height: 4;
        // margin-right: 20px;
      }
    }
    .centerData {
      height: 92%;
      padding: 0 15px 10px;
    }
  }
  .right {
    background-color: #fff;
    border-radius: 4px;
    margin-right: 0.6rem;
    // flex: 1;
    width: 26.5%;
    height: 100%;
  }
}
</style>
