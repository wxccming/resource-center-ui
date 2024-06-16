<template>
  <div class="home">
    <div class="con">
      <h1>矛盾纠纷多元化解"一站式"数据驾驶舱</h1>
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          :class="{ active: activeTab === index }"
          @click="gettab(index)"
        >
          {{ tab }}
          <div class="underline" v-if="activeTab === index"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "HomeView",
  created() {},
  beforeDestroy() {},
  data() {
    return {
      isshow: false,

      tabs: ["综合态势", "纠纷化解", "指挥调度", "管理后台"],
      activeTab: 0,
    };
  },
  computed: {},
  mounted() {
    console.log(666);
  },
  methods: {
    gettab(index) {
      this.activeTab = index;
      if (index == 0) {
        this.isshow = false;
      } else if (index == 1) {
        this.isshow = false;
      } else if (index == 2) {
        this.isshow = true;
      } else if (index == 3) {
        this.$router.push("/management");
        this.isshow = false;
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>
<style src="./PatrolDialog.scss" lang="scss" scoped></style>
<style src="./dialogDefect.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0 50px;
  background: #000;

  .con {
    z-index: 100;
    width: 100%;
    height: 70px;
    background: url("~@/assets/img/titelebg.png");
    text-align: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    display: flex;
  }
  h1 {
    z-index: 100;
    width: 100%;
    color: #fff;
    font-size: 28px;
    margin-top: 10px;
  }

  .tabs {
    position: absolute;
    top: 67px;
    right: 43px;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0.125rem 0 0 0;
  }
  .tab {
    position: relative;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    background: url("~@/assets/img/tab01.png");
    cursor: pointer;
    height: 49px;
    width: 138px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-right: 5px;
  }
  .active {
    background: url("~@/assets/img/tab03.png") !important;
    position: relative;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #fff;

    cursor: pointer;
    height: 49px;
    width: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-right: 5px;
  }

  .active .underline {
    display: block;
  }
}
</style>
