<template>
  <div>
    <div
      v-for="(card, ind) in cardList"
      :class="['cardItem', selectCardId === card.id ? 'cardActiveItem' : '']"
      @click="showCardDetail(card)"
      :key="ind"
    >
      <div class="item-tit">
        <div class="left-tit">
          <div class="circle"></div>
          <span class="tit-txt">{{ card.title }}</span>
          <span class="tit-tips" v-if="card.tips">{{ card.tips }}</span>
        </div>
        <!--        blue orange green-->
        <div :class="['status', card.statusColor]">
          {{ card.statusTxt }}
        </div>
      </div>
      <div class="itemCon">
        <el-row :gutter="20">
          <template v-for="(v, i) in card.items">
            <el-col class="col-item" :span="v.col ? v.col : 8" :key="i">
              <div class="itemCon-name">{{ v.name }}：</div>
              <div class="itemCon-val" v-if="v.type == 'progress'">
                <el-progress
                  style="width: 80%;display: flex;align-items: center"
                  :stroke-width="11"
                  :percentage="v.value"
                  color="#6699FC"
                  text-color="#4C8BFD"
                ></el-progress>
              </div>
              <div class="itemCon-val" v-else>{{ v.value }}</div>
            </el-col>
          </template>
        </el-row>
        <div class="btnArea">
          <template v-for="(btn, ii) in cardButtonArr">
            <div
              class="btnItem"
              v-if="btn.show ? btn.show(card) : true "
              @click.stop="btn.onClick(card)"
              v-hasPermission="btn.permission ? btn.permission : ''"
              :key="ii"
            >
              <img :src="btn.icon" alt="" />
              <el-badge
                :value="card.reportNum"
                v-if="btn.type == 'report' && card.reportNum != '0'"
                class="item"
              >
                <span>{{ btn.title }}</span>
              </el-badge>
              <span v-else>{{ btn.title }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardList: {
      detail: [],
    },
    cardButtonArr: {
      default: [],
    },
    isCardSwitch: {
      // 判断cardItem是否默认选中
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectCardId: "",
      isActiveCard: false,
    };
  },
  watch: {
    cardList: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          console.log(val);
          if (this.isCardSwitch === false && val.length > 0) {
            this.selectCardId = this.cardList[0].id;
            this.$emit("cardChange", this.isActiveCard, this.cardList[0]);
          }
        }
      },
    },
  },
  methods: {
    showCardDetail(card) {
      console.log(this.isCardSwitch);
      if (this.isCardSwitch) {
        if (this.selectCardId == card.id) {
          this.selectCardId = "";
          this.isActiveCard = false;
        } else {
          this.selectCardId = card.id;
          this.isActiveCard = true;
        }
      } else {
        this.selectCardId = card.id;
      }

      this.$emit("cardChange", this.isActiveCard, card);
      console.log("选中id:", card.id);
    },
  },
  mounted() {
    // if(this.isCardSwitch === false){
    //   this.selectCardId = this.cardList[0]?.id
    //   this.$emit('cardChange',this.isActiveCard,this.cardList[0])
    // }
    // console.log("this.cardList",this.cardList)
  },
};
</script>

<style lang="scss" scoped>
.cardItem {
  padding: 0px 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
}
.cardActiveItem {
  border-color: #2f81e7;
}
.item-tit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;

  .left-tit {
    display: flex;
    align-items: center;

    .circle {
      width: 8px;
      height: 8px;
      background: #63b3f9;
      border-radius: 50%;
    }

    .tit-txt {
      margin: 0 1rem;
      font-size: 1.6rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #242424;
    }

    .tit-tips {
      color: #f50622;
      font-size: 1.4rem;
    }
  }
  .status {
    font-size: 1.6rem;
    color: #fff;
    width: 8.8rem;
    line-height: 3.2rem;
    text-align: center;
    &.orange {
      background: #ffb238;
      box-shadow: 0px 6px 16px 0px rgba(176, 142, 83, 0.3);
      border-radius: 0px 16px 16px 16px;
    }
    &.green {
      background: #63e5af;
      box-shadow: 0px 6px 16px 0px rgba(99, 229, 175, 0.3);
      border-radius: 0px 16px 16px 16px;
    }
    &.blue {
      background: #40b0fa;
      box-shadow: 0px 6px 16px 0px #d4e4f8;
      border-radius: 0px 16px 16px 16px;
    }
    &.yellow {
      background: #ff7e00;
      box-shadow: 0px 6px 16px 0px #d4e4f8;
      border-radius: 0px 16px 16px 16px;
    }
    &.red {
      background: #db6262;
      box-shadow: 0px 6px 16px 0px #d4e4f8;
      border-radius: 0px 16px 16px 16px;
    }
  }
}
.itemCon {
  margin-top: 0.5rem;
  padding: 2rem;
  background: #f5f7fa;
  .col-item {
    font-size: 1.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    .itemCon-name {
      color: #5d6574;
      font-family: "Source Han Sans CN";
    }
    .itemCon-val {
      flex: 1;
      font-weight: 600;
      color: #191e2a;
    }
  }
  .btnArea {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    .btnItem {
      margin: 0 3rem;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      color: #666;
      cursor: pointer;
      img {
        margin-right: 2rem;
      }
    }
  }
}
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 0px;
  transform: translateY(-50%) translateX(100%);
}
</style>
