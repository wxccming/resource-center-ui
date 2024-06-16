<template>
  <div class="bg">
    <div class="layout">
    <div class="title">
        <slot name="title"></slot>
    </div>
    <div class="search">
        <slot name="search"></slot>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.bg {
  // padding: 10px 10px 0;
  // height: 100%;
}
.layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #fff;
    .title {
        height: max-content;
        padding: 0 10px;
    }
    .search {
        height: 15%;
        margin-top: 20px;
    }
    .content {
        flex: 1;
        padding: 0 10px;
        margin-top: 20px;
    }
}
</style>
