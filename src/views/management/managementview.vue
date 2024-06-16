<template>
  <div class="home">

    <titlecope :value="value"/>
    <div class="titlebox">
      <span style="color: rgba(0, 0, 0, .45);">首页 &nbsp;/&nbsp;</span> <span style="color: rgba(0, 0, 0, .45);">首页
        &nbsp;/&nbsp;</span> <span>工作台</span>
    </div>
    <div class="conbox">
      <div class="conboxtop">
        <div class="toptitle">
          2024年度
        </div>
        <div class="contabs">
          <el-tabs v-model="dayactiveName" type="card" @tab-click="dayhandleClick">

            <el-tab-pane label="今日" name="daytab1">

            </el-tab-pane>
            <el-tab-pane label="本周" name="daytab2">

            </el-tab-pane>
            <el-tab-pane label="本月" name="daytab3">

            </el-tab-pane>
            <el-tab-pane label="本年" name="daytab4">

            </el-tab-pane>
            <el-tab-pane label="全部" name="daytab5">

            </el-tab-pane>

          </el-tabs>
        </div>
      </div>
      <div class="jfzsbox">
        <div class="jfzszs">
          <div class="jfzsboxname">纠纷总数</div>
          <div class="jfzsboxnum">304件</div>
        </div>
        <div class="jfzscon" @click="getDetail(item)" v-for="item in listbox" :key="item.num">
          <div class="jfzscontop">
            <img :src="item.imgUrl" alt="">
            <div class="jfzscontopname">{{ item.name }}</div>
          </div>
          <div class="jfzsconnum">

            {{ item.num }}
          </div>
        </div>
      </div>
      <div class="jfhjqk">
        <div class="jfhjqktitle">
          <div class="jfhjqkbg">

          </div>
          <div class="jfhjqkname">
            纠纷化解情况
          </div>

        </div>
        <div ref="EchartsVBar" style="width: 1400px;height:200px;">

        </div>
      </div>
      <div class="conbuttom">
        <div class="conbuttomleft">
          <div class="jfhjqktitle">
            <div class="jfhjqkbg">
            </div>
            <div class="jfhjqkname">
              部门数据汇报
            </div>
          </div>
          <div class="leftconbox">
            <div class="leftcon" v-for="item in dqlistbox" :key="item.name">
              <div class="leftconsheng">
                <img :src="item.imgUrl" alt="">
                <div class="leftname">
                  {{ item.name }}
                </div>
              </div>
              <div class="leftnrbox">
                <ul>
                  <li @click="getDetail(items)" v-for="items in item.nrlist" :key="items.name">
                    <div class="nrname">
                      {{ items.name }}
                    </div>
                    <div class="nrname">
                      {{ items.num }}
                    </div>
                  </li>
                </ul>

              </div>

            </div>
          </div>
        </div>
        <div class="conbuttomright">
          <div class="jfhjqktitle">
            <div class="jfhjqkbg">
            </div>
            <div class="jfhjqkname">
              纠纷类型统计
            </div>
          </div>
       <img class="dqbg" src="../../assets/img/diqiu.png" alt="">
       <div ref="EchartsVyuan" style="z-index: 9999; width: 700px;height:340px;">

       </div>
        </div>
      </div>
    </div>
  <houseDialog :title="dialogTitle" :dialogVisible="dialogVisible" @close="closeDialog"></houseDialog>
  </div>
</template>

<script>
import houseDialog from "@/components/dialog/house/index.vue";
import titlecope from "./titlecope";
export default {
  components: {
    titlecope,
    houseDialog
  },
  name: "management",
  created() { },
  beforeDestroy() { },
  data() {
    return {
      value:"tab1",
      dayactiveName: 'daytab5',
      listbox: [
        { imgUrl: require("../../assets/img/jf01.png"), num: "205件", name: "调解中" },
        { imgUrl: require("../../assets/img/jf02.png"), num: "205件", name: "调解成功" },
        { imgUrl: require("../../assets/img/jf03.png"), num: "205件", name: "调解未果" },
        { imgUrl: require("../../assets/img/jf04.png"), num: "205件", name: "调解撤销" },
        { imgUrl: require("../../assets/img/jf05.png"), num: "205件", name: "调解终止" },

      ],
      dqlistbox: [
        { imgUrl: require("../../assets/img/sheng.png"), nrlist: [{ name: "无" },], name: "省级" },
        { imgUrl: require("../../assets/img/shi.png"), nrlist: [{ name: "公安", num: "41条" }, { name: "法院", num: "1条" }, { name: "司法", num: "11条" }, { name: "检察院", num: "1条" }, { name: "退役军人", num: "1条" }, { name: "信访", num: "1条" }, { name: "民政", num: "1条" }, { name: "妇联", num: "1条" }, { name: "12345", num: "1条" }], name: "市级" },
        { imgUrl: require("../../assets/img/xian.png"), nrlist: [{ name: "公安", num: "41条" }, { name: "法院", num: "1条" }, { name: "司法", num: "11条" }, { name: "检察院", num: "1条" }, { name: "退役军人", num: "1条" }, { name: "信访", num: "1条" }, { name: "民政", num: "1条" }, { name: "妇联", num: "1条" }, { name: "12345", num: "1条" }], name: "县级" },
        { imgUrl: require("../../assets/img/wanglu.png"), nrlist: [{ name: "网格", num: "41条" }, { name: "干警上报", num: "1条" }], name: "网络" },


      ],
      datas : [
        [
          { name: '知识产权纠纷', value: 5.6 },
          { name: '环境污染纠纷', value: 1 },
          { name: '领里纠纷', value: 0.8 },
          { name: '物业纠纷', value: 0.5 },
          { name: '经济纠纷', value: 0.5 },
          { name: '其它', value: 3.8 }
        ],
      ],
      dialogVisible: false,
      dialogTitle: ""
    };
  },
  computed: {},
  mounted() {
    ;
  },
  methods: {
    dayhandleClick(tab, event) {
      console.log(tab, event);
    },

    lineevent (nameList, valueListone) {
      let chartDoms = this.$refs.EchartsVBar
     let mycharts= this.$echarts.init(chartDoms);


      const option = {
        color: ["#1f71f9"],
        tooltip: {
          trigger: "axis",
        },
        // 图例组件



        //图形位置
        grid: {
          left: '1%',
          right: '1%',
          bottom: '8%',
          top: '8%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',

          //x轴坐标点开始与结束点位置都在最边缘，true为不在
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',//虚线

              color: ['rgba(255,255,255,.2)']


            },
            show: true //隐藏
          },


          axisTick: { // 坐标轴刻度相关设置
            show: false
          },
          //x轴字体设置
          axisLabel: {
            show: true,
            fontSize: 14,
            color: '#5d98fa',
            interval: 0,
            // rotate: 15
          },
          data: nameList,
        }],
        yAxis: [{
          // min: 0,

          max: 30,

          type: 'value',
          // name: '金额(万元)',
          // 坐标轴在图表区域中的分隔线
          splitLine: {
            lineStyle: {
              type: 'dashed',//虚线

              color: ['rgba(0,0,0,.1)']


            },
            show: true //隐藏
          },

          //y轴字体设置
          axisLabel: {

            show: true,
            color: '#a1a3a6',
            fontSize: 14,
          },


          //y轴线设置显示
          axisLine: {
            show: false,

          },
        }],
        series: [
          {

            type: 'line',
            // symbol: 'false',
            symbolSize: 15,
            lineStyle: {
              show: true,
              color: '#1f71f9',
              width: 2,
              type: 'solid',
            },
            areaStyle: { // 颜色自上而下渐变

              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ // 1代表上面

                offset: 0.1,
                color: '#76a8fc'


              }, {

                offset: 1,
                color: '#c1d8fe'

              }]),

              opacity: 1 // 填充区域透明度

            },


            data: valueListone
          },




        ]
      }


      option && mycharts.setOption(option);
      window.addEventListener("resize", function (event) {
        mycharts.resize();
      })
    },

    yuanevent() {
      let chartDoms = this.$refs.EchartsVyuan
     let mycharts= this.$echarts.init(chartDoms);
      const option =  {
       
  series: this.datas.map(function (data, idx) {
    var top = idx * 33.3;
    return {
      type: 'pie',
      radius: [95, 110],
      top:  '-8%',
      // height: '33.33%',
      left: 'center',
      width: 400,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        alignTo: 'edge',
        formatter: '{name|{b}}\n{time|{c} 小时}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
        rich: {
          time: {
            fontSize: 10,
            color: '#999'
          }
        }
      },
      labelLine: {
        length: 15,
        length2: 0,
        maxSurfaceAngle: 80
      },
      labelLayout: function (params) {
        const isLeft = params.labelRect.x < mycharts.getWidth() / 2;
        const points = params.labelLinePoints;
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;
        return {
          labelLinePoints: points
        };
      },
      data: data
    };
  })

      }
      option && mycharts.setOption(option);
      window.addEventListener("resize", function (event) {
        mycharts.resize();
      })
    },




    getDetail(val) {
      console.log(123);
      this.dialogTitle = val.name;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  },
  watch: {},
  mounted() {
    this.yuanevent()
    this.lineevent(
      ['2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12', '2024-01', '2024-02', '2024-03', '2024-04', '2024-05'],
      [
        5, 20, 11, 15, 16, 17, 18, 20, 12, 10, 20, 11, 15, 16, 17, 18, 20, 12, 10, 20, 11, 15, 16, 17, 18, 20, 12, 18, 20, 12
      ]

    )
  },
};
</script>
<style lang="scss" scoped>
.titlebox {
  width: 100%;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  padding: 15px 40px;

  span {
    font-size: 14px;
  }
}

.conbox {
  width: 100%;

  box-sizing: border-box;
  padding: 0 250px;

  .conboxtop {
    width: 100%;
    background: #fff;
    height: 50px;
    margin-top: 15px;
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;
    align-items: center;

    .toptitle {
      font-size: 14px;

    }
  }

}

.contabs {

  box-sizing: border-box;
  margin-left: 30px;

  margin-top: 15px;

}

::v-deep .contabs .el-tabs--card>.el-tabs__header {
  border-bottom: none !important;
}

::v-deep .contabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none !important;
}

::v-deep .contabs .el-tabs--card>.el-tabs__header .el-tabs__item {
  // border-bottom: 2px solid #fff !important;
  border-left: none !important;
  color: #000;
  font-size: 14px;
}

::v-deep .contabs .el-tabs__item.is-active {
  // color: red !important; //选中
  color: #5f7cef;
  border-bottom: 4px solid #5f7cef !important;
  // opacity: 1;
}

::v-deep .contabs .el-tabs__item {
  padding: 0;
  margin: 0 20px;
}

::v-deep .contabs .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
  padding: 0 !important;
}

::v-deep .contabs .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
  padding: 0 !important;
}

.jfzsbox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.jfzszs {
  width: 230px;
  height: 60px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .jfzsboxname {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #606566;
    font-weight: 600;
  }

  .jfzsboxnum {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #0354d9;
    font-weight: 600;
  }
}

.jfzscon {
  width: 230px;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
}

.jfzscontop {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;

  img {
    width: 28px;
    height: 25px;

  }
}

.jfzscontopname {
  font-size: 18px;
  color: #7d8494;
  margin-left: 10px;

}

.jfzsconnum {
  font-size: 20px;
}

.jfhjqk {
  width: 100%;
  height: 220px;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 5px 10px;
  background: #fff;

  .jfhjqktitle {
    width: 100%;
    display: flex;

    .jfhjqkbg {
      width: 5px;
      height: 20px;
      background: #0354d9;
    }

    .jfhjqkname {
      font-size: 16px;
      color: #606566;
      margin-left: 5px;
    }
  }
}

#qsfx_zst {
  width: 1000px;
  height: 200px;
}

.conbuttom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.conbuttomleft {
  width: 700px;

  .jfhjqktitle {
    width: 100%;
    display: flex;
    background: #fff;
    height: 30px;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;

    .jfhjqkbg {
      width: 5px;
      height: 20px;
      background: #0354d9;
    }

    .jfhjqkname {
      font-size: 16px;
      color: #606566;
      margin-left: 5px;
    }
  }
}

.conbuttomright {
  width: 700px;
  background: #fff;
  position: relative;
  .jfhjqktitle {
    width: 100%;
    display: flex;
    background: #fff;
    height: 30px;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;

    .jfhjqkbg {
      width: 5px;
      height: 20px;
      background: #0354d9;
    }

    .jfhjqkname {
      font-size: 16px;
      color: #606566;
      margin-left: 5px;
    }
  }
}

.leftconbox {
  width: 100%;

  .leftcon {
    width: 100%;
    height: 65px;
    display: flex;
    margin-top: 20px;

    .leftconsheng {
      width: 170px;
      height: 65px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 28px;
        height: 30px;
      }

      .leftname {
        font-size: 18px;
        color: #1c6ff9;
        margin-left: 10px;
      }
    }
  }

}
.leftcon > .leftnrbox:nth-child(even)  {
  // overflow-x: scroll !important;
    overflow-y: hidden !important;
} 

.leftnrbox  {
  width: 530px;
height: 75px;
 
  // overflow: auto;

  // overflow-x: hidden;

  ul {
    padding: 0;
    margin: 0;
    height: 100%;
    min-width: 100%;
    // display: -webkit-box;
    // display: -ms-flexbox;
    display: flex;
  }

  li {
    width: 117px;
    height: 63px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 10px;
    cursor: pointer;
    flex: none;

    .nrname {
      width: 100%;
      color: #000;
      font-size: 14px;
      text-align: center;
    }
  }

}
.dqbg{
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}


  /*滚动条的宽度*/
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px !important;; 
    background: #fff;
    margin-top: 5px;
}
::-webkit-scrollbar-track {
    border-radius: 5px;
}
::-webkit-scrollbar-thumb {
    background: #d2e2fe;
   
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #d2e2fe;
}
</style>