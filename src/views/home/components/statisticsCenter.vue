<template>
    <div>
        <!--    <img class="statisticsBtn" src="@/assets/img/收缩左.png" @click="showStatistics=!showStatistics">-->
        <div :class="['statisticsCon', showStatistics ? 'showStatistics' : '']">
            <div class="msgConWrap">
                <div class="msg-tit">
                    <img src="@/assets/img/jj-tit.png" style="margin-right:10px">装机容量为 1800MW
                </div>
                <div class="msgCon">
                    <div>
                        <div class="msg-item-tit">上水库:</div>
                        <div class="msg-item" v-for="(v,i) in topSK" :key="i">
                            <span class="item-desc">{{ v.name }}：</span><span class="item-val">{{ v.txt }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="msg-item-tit">下水库:</div>
                        <div class="msg-item" v-for="(v,i) in botSK" :key="i">
                            <span class="item-desc">{{ v.name }}：</span><span class="item-val">{{ v.txt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showStatistics: false,
            topSK: [
                {name: '控制流域面积', txt: '1.99km2'},
                {name: '正常蓄水位为', txt: '725.00m'},
                {name: '设计洪水位为', txt: '726.10m'},
                {name: '校核洪水位为', txt: '726.54m'},
                {name: '死水位', txt: '695m'},
                {name: '坝顶高程', txt: '729.20m'},
                {name: '大坝坝顶宽度', txt: '10m'},
                {name: '坝轴线长', txt: '510m'},
                {name: '最大坝高', txt: '89.2m'},
            ],
            botSK: [
                {name: '控制流域面积', txt: '65.3km2'},
                {name: '正常蓄水位为', txt: '319.00m'},
                {name: '设计洪水位为', txt: '319.00m'},
                {name: '校核洪水位为', txt: '321.87m'},
                {name: '死水位', txt: '298.00m'},
                {name: '坝顶高程', txt: '323.85m'},
                {name: '大坝坝顶宽度', txt: '10m'},
                {name: '坝顶长', txt: '375m'},
                {name: '最大坝高', txt: '49.0m'},
            ]
        };
    },
    methods: {},
    mounted() {
    },
};
</script>

<style lang="scss" scoped>
.statisticsCon {
  height: 0;
  overflow: hidden;
  color: #fff;

  &.showStatistics {
    height: auto;
  }
}

.msgConWrap {
  width: 570px;
  height: 340px;
  background: url("~@/assets/img/jj.png") no-repeat;
  background-size: 100% 100%;
  padding: 10px;

  .msg-tit {
    line-height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.6);
  }
}

.msg-item-tit {
  color: #0BF7F7;
  line-height: 1;
  margin: 1rem 0;
  font-size: 16px;
}

.msgCon {
  padding: 0 20px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    width: 46%;
    //float: left;
  }

  .msg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }

  .item-desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
