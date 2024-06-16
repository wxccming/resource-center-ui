<template>
    <div class="common-tit">{{title}}</div>
</template>

<script>
export default {
  props:['title'],
  data() {
    return {}
  },
  methods:{},
  mounted(){}
}
</script>

<style lang="scss" scoped>
.common-tit{
  width: 100%;
  height: 3rem;
  background: url("~@/assets/img/标题拷贝.png") no-repeat;
  background-position: center center;
  color: #fff;
  text-align: center;
  line-height: 3rem;
}
</style>
