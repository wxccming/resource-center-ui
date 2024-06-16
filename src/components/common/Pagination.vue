<template>
  <div class="pagination">
    <el-pagination
      :page-size="pageSize"
      :current-page="pageNum"
      :pager-count="5"
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next"
      :total="total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageSize', 'pageNum', 'total', 'handleCurrentChange']
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
