<template>
  <div class="cardList">
    <div class="cardItemWrap">
      <cardItem ref="cardItemCom" v-show="cardData.length" :cardList="cardData" :cardButtonArr="cardButton" v-bind="$attrs" v-on="$listeners" ></cardItem>
      <el-empty :image-size="200" v-show="!cardData.length"></el-empty>
    </div>
    <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="cardTotal">
    </el-pagination>
  </div>
</template>

<script>
import cardItem from "@/components/cardList/cardItem";

export default {
  props: {
    cardTotal:{
      default:0
    },
    cardData: {
      default: []
    },
    cardButton:{
      default:[]
    }
  },
  components: {cardItem},
  data() {
    return {
      currentPage:1,
      pageSize:20
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize=val
      this.$emit("pageChange",this.currentPage,val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage=val
      this.$emit("pageChange",val,this.pageSize)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.cardList{
  width: 100%;
  height: 100%;
  .cardItemWrap{
    width: 100%;
    height: calc(100% - 5rem);
    overflow-x: auto;
  }
  .pagination{
    margin: 1rem 0;
    text-align: right;
  }
}
</style>
