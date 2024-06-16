<template>
  <!-- 折线图 -->
  <div class="Echarts echarts-zoom-fit" style="width: 100%; height: 100%">
    <div ref="EchartsLine" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "echartsLine",
  props: {
    chartData: {
      type: Array,
      default: [],
    },
    XData: {
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
      lineChart: null,
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
      let chartDom = this.$refs.EchartsLine;
      if (!this.lineChart) this.lineChart = this.$echarts.init(chartDom);
      let option;
      option = {
        color: this.attrib.colorList,
        tooltip: {
          show: this.attrib.tooltipShow ? true : false,
          trigger: "axis",
          confine: true,
        },
        legend: {
          show: this.attrib.legendShow ? true : false,
          right: 10,
          top: 5,
          itemWidth: 6,
          itemHeight: 6,
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
          type: "category",
          splitLine: { show: false },
          axisTick: { show: this.attrib.xSplitLine ?? false },
          axisLabel: { show: true },
          axisLine: { show: true },
          data: this.XData,
        },
        yAxis: {
          name: this.attrib.yAxisName ? this.attrib.yAxisName : "",
          type: "value",
          splitLine: { show: this.attrib.ySplitLine ?? false },
          axisTick: { show: false },
          axisLabel: { show: true },
          axisLine: { show: 'yAxisLine' in this.attrib ? this.attrib.yAxisLine : true },
        },
        series: [],
      };
      if (this.chartData.length > 0) {
        option.series = this.chartData.map((item) => ({
          name: item.name ? item.name : "",
          type: "line",
          smooth: 'smooth' in item ? item.smooth : true,
          stack: item.stack ? item.stack : "",
          barWidth: item.barWidth ? item.barWidth : "20",
          // showBackground: true,
          // backgroundStyle: {
          //   color: "#044D57",
          // },
          label: {
            show: item.label ? true : false,
            fontSize: 10,
            color: item.labelColor ? item.labelColor : "#4C8BFD",
            position: item.labelPo ? item.labelPo : "top",
            distance: 3,
          },
          itemStyle: {
            color: item.itemColor,
            normal: {
              lineStyle: item.lineStyle ?? "",
              // {
              //   width: 2,
              //   type: "dotted", //'dotted'虚线 'solid'实线
              // }
            },
          },

          // areaStyle: {
          //   color:item.areaColor ? item.areaColor instanceof Array ? new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {offset: 0, color: item.areaColor[0]},
          //     {offset: 1, color: "transparent"},
          //   ]) : item.areaColor : "",
          // },
          data: item.data,
        }));
      }

      option && this.lineChart.setOption(option);

      setTimeout(() => {
        this.lineChart.resize();
      }, 500);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="scss" scoped></style>
