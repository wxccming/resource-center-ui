<!-- 头部标签 -->
<template>
  <div class="content">
    <div class="item" v-for="(tag, index) in tags" :key="tag.name">
      <div class="tag" v-if="tags.length == index + 1">
        <span class="name" style="color: #037755; font-weight: 700">{{
          tag.name
        }}</span>
      </div>
      <div class="tag" v-else>
        <span class="name" @click="go(tag)">{{ tag.name }}</span>
        <span>{{ " >> " }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    go(tag) {
      this.$router.push(tag.path);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba($color: #1890ff, $alpha: 0.2);
  // justify-content: space-around;
}
.name {
  cursor: pointer;
}
</style>
