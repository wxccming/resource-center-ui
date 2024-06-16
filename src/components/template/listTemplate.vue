<template>
  <div class="listTemplate">
    <div class="search" ref="search">
      <slot name="Search"></slot>
    </div>
    <div class="content">
      <div class="contentDiv">
        <div class="tableArea">
          <slot name="Table"></slot>
        </div>
        <div class="pagination" ref="pagination" :style="`padding-top: ${$slots.Pagination ? 10 : 0}px;`">
          <slot name="Pagination"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "listTemplate",
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.listTemplate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;

  .search {
    width: 100%;
    height: 60px;
    flex-shrink: 0;
    border-bottom: 1px solid #D0E3FE;
  }

  .content {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10px;

    .contentDiv {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      //box-shadow: 0 5px 30px 0 rgba(3, 117, 111, 0.31);
      //padding: 10px;

      .tableArea {
        flex: 1;
        width: 100%;
        height: 100%;
      }

      .pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }

  }

}
</style>
