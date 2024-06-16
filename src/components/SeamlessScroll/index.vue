<template>
  <vue-seamless-scroll :data="list" :class-option="classOption" class="warp">
    <ul class="ul-item">
      <li class="li-item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>

import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'SeamlessScroll',
  components: {
    vueSeamlessScroll
  },
  props: {
    list: { type: Array, default: () => { return [] } },
    option: { type: Object, default: () => { return {} } }
  },
  data() {
    return {
      classOption: {
        step: 0.5,
        limitMoveNum: 1,
        direction: 2,
        isSingleRemUnit: true,
        ...this.option
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    &.ul-item {
      display: flex;
      .li-item {
        margin-right: 50px;
      }
    }
  }
}
</style>