<template>
  <div class="box">
      <div>我是父组件</div>
 
      <div style="display: flex">
        <!-- 子组件 1 （-_- 我和 子组件2 是同级关系 所以是兄弟组件 -_- ）-->
        <baby1 class="border"></baby1>
        <!-- 子组件 2 （-_- 我和 子组件1 是同级关系 所以是兄弟组件 -_- ）-->
        <baby2 class="border"></baby2> 
      </div>
      
  </div>
</template>
 
<script>
import baby1 from '@/views/home/components/map.vue'
import baby2 from '@/views/achievement/PatrolPoint/index.vue'
 
export default {
  name: 'home',
  components:{
    baby1,
    baby2
  }
}
</script>