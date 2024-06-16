<template>
  <!-- 饼图 -->
  <div class="Echarts echarts-zoom-fit" style="width: 100%; height: 100%">
    <div ref="EchartsPie" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "echartsPie",
  props: {
    chartData: {
      type: Array,
      default: [],
    },
    attrib: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      pieChart: null,
      totleNum: 0,
    };
  },
  watch: {
    chartData(n) {
      console.log("chartData---", n);
      if (n) {
        this.totleNum = n[0].totleNum;
        console.log("饼图中间值", n[0].totleNum);
        // 监听数据发生改变 刷新图表数据
        this.drawChart();
      }
    },
  },
  methods: {
    drawChart() {
      let that = this;
      let chartDom = this.$refs.EchartsPie;
      if (!this.pieChart) this.pieChart = this.$echarts.init(chartDom);
      let option;
      option = {
        legend: {
          show: this.attrib.legendShow ? true : false,
          bottom: -5,
          left: "center",
        },
        title: {
          show: this.totleNum ? true : false,
          text: `{val|${this.totleNum}}\n{total|总}`,
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              total: {
                fontSize: 20,
                color: "#fff",
                padding: [20, 10],
              },
              val: {
                fontSize: 20,
                fontWeight: "bold",
                padding: [-10, 0],
                color: "#fff",
              },
            },
          },
        },
        series: [],
      };
      if (this.chartData.length > 0) {
        option.series = this.chartData.map((item) => ({
          name: item.name ? item.name : "",
          type: "pie",
          minAngle: item.minAngle ? item.minAngle : 0, //最小角度
          startAngle: item.startAngle ? item.startAngle : 0, //起始角度
          radius: item.radius ? item.radius : ["40%", "70%"],
          avoidLabelOverlap: true, //启用防止标签重叠策略
          center: item.center ? item.center : ["50%", "50%"],
          itemStyle: {
            color: function (params) {
              if (!item.colorList) return;
              if (item.colorList[params.dataIndex] instanceof Array) {
                return new that.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    offset: 0,
                    color: item.colorList[params.dataIndex][0],
                  },
                  {
                    offset: 1,
                    color: item.colorList[params.dataIndex][1],
                  },
                ]);
              } else {
                return item.colorList[params.dataIndex];
              }
            },
            borderRadius: item.itemStyle?.borderRadius
                ? item.itemStyle.borderRadius
                : 0,
            borderColor: item.itemStyle?.borderColor
                ? item.itemStyle.borderColor
                : "",
            borderWidth: item.itemStyle?.borderWidth
                ? item.itemStyle.borderWidth
                : 0,
          },
          label: {
            formatter: "{b} {c} \n {d}%",
            position: "inside",
            color: '#333'
          },
          // label: {
          //   ...item.labelVal,
          //   show: item.label?true:false,
          //   formatter: item.formatter?item.formatter:'{name|{b}} {val|{c}} ',
          //   minMargin: 8,
          //   edgeDistance: 10,
          //   lineHeight: 10,
          //   padding: [0, -10],
          //   fontSize:13,

          //   rich: {
          //     val: {
          //       fontSize: 13,
          //       color: '#fff'
          //     },
          //     name: {
          //       fontSize: 13,
          //       color: '#fff'
          //     },
          //   }
          // },
          labelLine: {
            show: item.labelLine ? true : false,
            length: 8,
            length2: 14,
            maxSurfaceAngle: item.maxSurfaceAngle ? item.maxSurfaceAngle : 80,
          },
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < that.pieChart.getWidth() / 2;
            const points = params.labelLinePoints;
            if (!points) return;
            // Update the end point.
            points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          },
          data: item.data,
        }));
      }

      option && this.pieChart.setOption(option);
      this.pieChart.on("click", this.eConsole);
      setTimeout(() => {
        this.pieChart.resize();
      }, 500);
    },
    eConsole(param) {
      // console.log("param", param, param.dataIndex);
      this.$emit('pieClick',param.data)
    }
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="scss" scoped></style>
