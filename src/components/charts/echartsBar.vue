<template>
  <!-- 柱状图 -->
  <div class="Echarts echarts-zoom-fit" style="width: 100%; height: 100%">
    <div ref="EchartsBar" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "echartsBar",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    XData: {
      type: Array,
      default: () => [],
    },
    YData: {
      type: Array,
      default: () => [],
    },
    attrib: {
      type: Object,
      default: {},
    },
    isOnePic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      barChart: null,
    };
  },
  watch: {
    chartData(n) {
      // 监听数据发生改变 刷新图表数据
      this.drawChart();
    },
  },
  methods: {
    drawChart() {
      let chartDom = this.$refs.EchartsBar;
      if (!this.barChart) this.barChart = this.$echarts.init(chartDom);
      let option;

      option = {
        title: this.attrib.title ?? {},
        tooltip: {
          show: this.attrib.tooltipShow ? true : false,
          trigger: "axis",
          confine: true,
          fontSize: "10px",
          formatter: (val) => {
            let str = ``;
            let item = {};
            val.forEach((v, i) => {
              item = v
              str += `
              <div style='display:flex;'>
                <span style='color:${this.chartData[i].itemColor}'>${this.chartData[i].name  ?? ""}</span>&nbsp;  
                <span style='color:${this.chartData[i].itemColor}'>${val[i].data.value ?? val[i].data + (this.attrib.tooltipFormatter ?? "")}</span>
              </div>
                `;
            });
            str =
              `<div style='display:flex;'>
              <div >${item.name}</div>
              </div>` + str;
            return str;
          },
        },
        legend: {
          show: this.attrib.legendShow ? true : false,
          right: 'center',
          bottom: 1,
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: this.isOnePic ? "#C7EAF9" : "#999999",
            fontSize: "12px",
          },
        },
        grid: this.attrib.gridSet
          ? this.attrib.gridSet
          : {
              left: 5,
              right: 5,
              bottom: 0,
              top: 25,
              containLabel: true,
            },
        xAxis: {
          minInterval: 1,
          type: this.attrib.category ? this.attrib.category : "category",
          splitLine: { show: false },
          axisTick: {
            show: false,
            alignWithLabel: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(150, 160, 179, 0.4)",
            },
          },
          axisLabel: {
            show: true,
            formatter: (val) => {
              return val + (this.attrib.xFormatter ?? "");
            },
            textStyle: {
              color: this.isOnePic ? "#C7EAF9" : "#666666",
            },
          },
          data: this.XData,
        },
        yAxis: {
          name: this.attrib.yAxisName ? this.attrib.yAxisName : "",
          minInterval: this.attrib.minInterval ?? 1,
          nameTextStyle: {
            fontSize: "12px",
            color: this.isOnePic ? "#C7EAF9" : "#999999",
          },
          type: this.attrib.category
            ? this.attrib.category == "category"
              ? "value"
              : "category"
            : "value",
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            formatter: (val) => {
              return val + (this.attrib.yFormatter ?? "");
            },
            textStyle: {
              color: this.isOnePic ? "#C7EAF9" : "#666666",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(150, 160, 179, 0.4)",
            },
          },
          data: this.YData,
        },
        series: [],
      };
      if (this.chartData.length > 0) {
        option.series = this.chartData.map((item) => ({
          name: item.name ? item.name : "",
          type: "bar",
          stack: item.stack ? item.stack : "",
          barWidth: item.barWidth ? item.barWidth : "20",
          label: {
            show: item.label ? true : false,
            fontSize: 10,
            color: item.labelColor ? item.labelColor : "#4C8BFD",
            position: item.labelPo ? item.labelPo : "top",
            distance: 3,
            normal: {
              show: true,
              fontSize: 10,
              color: item.labelColor ? item.labelColor : "#4C8BFD",
              position: item.labelPo ? item.labelPo : "top",
              formatter: (params) => {
                // 需求坐标显示百分比，但label值显示别的
                if (this.attrib.showLabel) {
                  return this.attrib.showLabel[params.name] != "0"
                    ? this.attrib.showLabel[params.name]
                    : "";
                } else if (params.value >= 0) {
                  return params.value + (this.attrib.dataFormat ?? "");
                } else {
                  return "";
                }
              },
            },
            formatter: (val) => {
              return val.value + (this.attrib.formatter ?? "");
            },
          },
          itemStyle: {
            color: item.itemColor
              ? item.itemColor instanceof Array
                ? new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: item.itemColor[0] },
                    { offset: 1, color: item.itemColor[1] },
                  ])
                : item.itemColor
              : "",
          },
          markLine: this.attrib.warningLine
            ? {
                // show: this.attrib.warningLine,
                symbol: "none", //去掉警戒线最后面的箭头
                label: {
                  position: "end", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                  formatter: "",
                },
                data: [
                  {
                    silent: false, //鼠标悬停事件  true没有，false有
                    lineStyle: {
                      //警戒线的样式  ，虚实  颜色
                      type: "solid",
                      color: "rgba(238, 99, 99)",
                    },
                    name: "警戒线",
                    yAxis: 50,
                  },
                ],
              }
            : "",
          data: item.data,
        }));
      }

      option && this.barChart.setOption(option);

      setTimeout(() => {
        this.barChart.resize();
      }, 500);
    },
  },
  mounted() {
    console.log("X轴值", this.XData);
    console.log("是否为无人机一张图", this.isOnePic);
    this.drawChart();
  },
};
</script>

<style lang="scss" scoped>
a {
}
</style>
