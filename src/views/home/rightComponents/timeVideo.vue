<template>
  <!-- 实时视频 -->
    <div>
        <commonTit title="实时视频"/>
        <div class="videoBox" :key="comKey">
            <!--@/assets/智巡输电外业飞行视频0228.mp4-->
            <video src="@/assets/智巡输电外业飞行视频0228.mp4" width="338" height="190" controls muted autoplay></video>
            <!--<liveVideo :width="338" v-if="videoAddress" :height="190" :address="videoAddress"/>
            <img v-else src="@/assets/img/nodata.png" alt="">-->
            <!--<video class="videoEl" controls muted autoplay>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>-->
        </div>
    </div>
</template>

<script>
import commonTit from "./title"
import liveVideo from "@/components/realTimeVideo/components/LiveVideo";

export default {
    components: {commonTit, liveVideo},
    data() {
        return {
            videoAddress: '',
            comKey: 1
        }
    },
    methods: {},
    mounted() {
        this.$bus.$on('taskChooseMsg', (data) => {
            // 选择的执行中任务
            // console.log('row--data',data)
            this.comKey = getRandomUniqueNumber(this.comKey)
            if (data) this.videoAddress = data.id
        });
    }
}

// 生成1到10之间的随机整数 且不与当前数重复
function getRandomUniqueNumber(currentNumber) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 10) + 1; // 生成1到10之间的随机整数
    } while (randomNumber === currentNumber);

    return randomNumber;
}
</script>

<style lang="scss" scoped>
.videoBox {
  width: 100%;
  //height: calc(100% - 6rem);
  height: 200px;
  border: 1px solid #01C696;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

//.videoEl {
//  width: 100%;
//  height: 100%;
//  object-fit: fill;
//}
</style>
