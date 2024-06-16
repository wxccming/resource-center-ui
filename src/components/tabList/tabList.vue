<template>
  <div class="content">
    <div class="list" v-show="tabList.length">
      <div class="tab">
        <tab-item
          v-for="item in tabList"
          :key="item.data"
          :content-config="contentConfig"
          :value="item"
          :buttonList="buttonList"
          :keys="keys"
          v-on="$listeners"
          :selectCardId.sync="selectCardId"
        ></tab-item>
      </div>
      <pagination
        class="pagination"
        @size-change="handleSizeChange"
        :handleCurrentChange="changePages"
        :page-size="page.pageSize"
        :total="page.total"
      >
      </pagination>
    </div>
    <el-empty :image-size="200" v-show="!tabList.length"></el-empty>
  </div>
</template>

<script>
import tabItem from "./tabItem.vue";
export default {
  components: { tabItem },
  name: "tabList",
  props: {
    contentConfig: {
      type: Array,
      default: () => {},
    },
    tabList: {
      type: Array,
      default: () => {},
    },
    buttonList: {
      type: Array,
      default: () => {},
    },
    page: {
      default: () => {
        return {
          pageSize: 10,
          pageNum: 1,
          total: 0,
        };
      },
    },
    keys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectCardId: "", // 选中的卡片id
    };
  },
  computed: {},
  mounted() {},
  methods: {
    changePages(pageNum) {
      this.$emit("changePages", pageNum);
    },
    handleSizeChange() {},
  },
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  position: relative;
}
.list {
  height: 100%;
  position: relative;
  .tab {
    height: 100%;
    position: relative;
    overflow: scroll;
    &::after {
      content: "";
      display: block;
      position: sticky;
      bottom: 0;
      width: 100%;
      height: 35px;
      background-color: #fff;
    }
  }
  .pagination {
    position: absolute;
    bottom: 5px;
    right: 0;
  }
}
</style>
