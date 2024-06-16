<template>
  <div
    class="tab-item"
    :class="['cardItem', selectCardId === value.id ? 'cardActiveItem' : '']"
    @click="showCardDetail(value)"
  >
    <div class="top">
      <div class="title">
        <span class="log"></span>
        <span>{{ getTitle() }}</span>
      </div>
    </div>
    <div class="content">
      <div class="center">
        <div v-for="index in Math.ceil(contentConfig.length / 3)" :key="index">
          <el-row>
            <el-col
              :span="8"
              v-for="i in colunm"
              :key="i"
              v-if="contentConfig[(index - 1) * colunm + i - 1]"
            >
              <span class="title"
                >{{ contentConfig[(index - 1) * colunm + i - 1].title }}:</span
              >
              <div
                class="progress"
                v-if="
                  contentConfig[(index - 1) * colunm + i - 1].type == 'progress'
                "
              >
                <el-progress
                :stroke-width="10"
                 class="showProgressColor"
                  :percentage="
                    value[contentConfig[(index - 1) * colunm + i - 1].key]
                  "
                ></el-progress>
              </div>
              <!-- // value[contentConfig[(index - 1) * colunm + i - 1].key] -->
              <span
                class="value"
                v-else-if="contentConfig[(index - 1) * colunm + i - 1].formater"
                >{{
                  contentConfig[(index - 1) * colunm + i - 1].formater(value)
                }}</span
              >
              <span class="value" v-else>{{
                value[contentConfig[(index - 1) * colunm + i - 1].key]
              }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer">
        <div v-for="item in buttonList" :key="item.title">
          <el-button
            type="text"
            @click.stop="clickRow(item)"
             v-preventReClick
            v-hasPermission="item.permission ? item.permission : ''"
          >
            <img
              :src="item.img ? item.img : require('@/assets/img/杆塔列表.png')"
              alt=""
            />
            <div>{{ item.title }}</div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabItem",
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    contentConfig: {
      type: Array,
      default: () => [],
    },
    buttonList: {
      type: Array,
      default: () => [],
    },
    colunm: {
      default: 3,
    },
    keys: {
      type: Array,
      default: () => [],
    },
    selectCardId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // selectCardId: '',
      isActiveCard: "",
      customColor:['#6699FC','#A4E6FF']
    };
  },
  computed: {},
  mounted() {},
  methods: {
    showCardDetail(card) {
      if (this.selectCardId === card.id) {
        // this.selectCardId = "";
        this.$emit("update:selectCardId", "");
        this.isActiveCard = false;
      } else {
        // this.selectCardId = card.id;
        this.$emit("update:selectCardId", card.id);
        this.isActiveCard = true;
      }
      this.$emit("cardChange", this.isActiveCard, card);
      console.log("选中id:", card.id);
    },
    clickRow(item) {
      item.onClick(this.value);
      // console.log(this.value);
    },
    getTitle() {
      let title = "";
      this.keys.forEach((ele) => {
        title = title + "  " + this.value[ele];
      });
      return title;
    },
  },
};
</script>

<style scoped lang="scss">
.tab-item {
  width: 100%;
  font-size: 14px;
  border-radius: 4px;
   margin-bottom: 0.8rem;
  border: 1px solid transparent;
  //   padding: 0 15px;
  .content {
    border-radius: 5px;
    background: #F5F7FA;
    // border: 1px solid #2f81e7;

    opacity: 0.94;
  }
  .top {
    display: flex;
    justify-content: space-between;
    height: 44px;
    font-size: 17px;
    font-weight: 500;
    padding: 5px 0;
    margin: 0px 0px 10px  15px;
    align-items: center;
    .log {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #63b3f9;
      border-radius: 50%;
    }
    span {
      margin-right: 10px;
    }
  }
  .center {
    padding: 10px 15px;
    // margin: 0 15px 10px;
    font-family: Source Han Sans CN;
    box-shadow: 0 0 2px 0 rgba(145, 158, 196, 0.5);
    .title {
      margin-right: 10px;
      color: #5d6574;
    }
    .value {
      font-weight: 600;
      color: #191e2a;
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #666666;
    height: 45px;
  }
}
::v-deep .el-button--text {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 20px;
    margin-right: 8px;
  }
}
::v-deep .el-row {
  margin-top: 10px;
  .el-col {
    display: flex;
    .progress {
      width: 60%;
    }
  }
}
.cardActiveItem {
  border: 1px solid #2f81e7;
}
::v-deep .el-progress__text{
  font-size: 14px !important;
  color: #4C8BFD !important;
}

</style>
