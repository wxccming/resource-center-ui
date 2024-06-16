<template>
  <!-- 柱状图 -->
  <div class="Echarts echarts-zoom-fit" style="width: 100%;height:100%;">
    <div ref="EchartsVBar" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "echartsVBar",
  props: {
    chartData: {
      type: Array,
      default: []
    },
    XData: {
      type: Array,
      default: []
    },
    attrib:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      vbarChart: null
    }
  },
  watch: {
    chartData(n) {
      // 监听数据发生改变 刷新图表数据
      this.drawChart()
    }
  },
  methods: {
    drawChart() {
      let chartDom = this.$refs.EchartsVBar
      if (!this.vbarChart) this.vbarChart = this.$echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          show: this.attrib.tooltipShow?true:false,
          trigger: 'axis',
          confine:true
        },
        legend: {
          show:this.attrib.legendShow?true:false,
          right: 10,
          top:5,
          itemWidth:6,
          itemHeight:6
        },
        grid: this.attrib.gridSet ? this.attrib.gridSet : {
          left: 5,
          right: 5,
          bottom: 0,
          top: 25,
          containLabel: true
        },
        xAxis: {
          name:this.attrib.xAxisName?this.attrib.xAxisName:'',
          type: 'value',
          minInterval:1,
          splitLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: true},
          axisLine: {show: true},
        },
        yAxis: {
          name:this.attrib.yAxisName?this.attrib.yAxisName:'',
          type: 'category',
          splitLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: true},
          axisLine: {show: true},
          data: this.XData
        },
        series: []
      };
      if (this.chartData.length > 0) {

        option.series = this.chartData.map((item) => ({
          name: item.name ? item.name : '',
          type: "bar",
          stack: item.stack?item.stack:'',
          barWidth: item.barWidth ? item.barWidth : "20",
          // showBackground: true,
          // backgroundStyle: {
          //   color: "#044D57",
          // },
          label: {
            show: item.label ? true : false,
            fontSize: 10,
            color: item.labelColor ? item.labelColor : "#4C8BFD",
            position: item.labelPo?item.labelPo:"top",
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
                } else if (params.value > 0) {
                  return params.value + (this.attrib.dataFormat ?? "");
                } else {
                  return "";
                }
              },
            },
          },
          itemStyle: {
            color: item.itemColor ? item.itemColor instanceof Array ? new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: item.itemColor[0]},
              {offset: 1, color: item.itemColor[1]},
            ]) : item.itemColor : "",
          },
          data: item.data,
        }))
      }

      option && this.vbarChart.setOption(option);

      setTimeout(() => {
        this.vbarChart.resize()
      }, 500)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style lang="scss" scoped>

</style>
