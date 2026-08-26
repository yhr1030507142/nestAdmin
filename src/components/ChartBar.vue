<script>
import { echartColors } from '@/utils/common'
import merge from 'lodash.merge'
export default {
  // 柱状图
  name: 'ChartBar',
  components: {},
  props: {
    // X轴坐标数据
    xData: {
      type: Array,
      default: () => ['腾讯广告', '巨量引擎', '京东数坊', '达摩盘', '数据银行', '微信广告', '企业微信'],
    },
    // 图例
    legend: {
      type: Array,
      default: () => [],
    },
    // 展示数据集
    // 注：二位数组， 其一维数组顺序需要和图例顺序一致，其二维数组顺序需要和X轴数组顺序一致
    // 单条数据集：[120, 132, 101, 134, 90, 230, 210]，其实会被转换成[[120, 132, 101, 134, 90, 230, 210]]
    // 多条数据集：
    // [
    //     [120, 132, 101, 134, 90, 230, 210],
    //     [220, 182, 191, 234, 290, 330, 310],
    //     [150, 232, 201, 154, 190, 330, 410],
    //     [320, 332, 301, 334, 390, 330, 320]
    //   ]
    series: {
      type: Array,
      default: () => [[120, 132, 101, 134, 90, 230, 210]],
    },
    // 是否为堆叠柱状图
    stack: {
      type: Boolean,
      default: false,
    },
    // 自定义图表配置项，使用loadsh.merge(origin, option)和原有的配置进行覆盖合并
    // loadsh.merge: https://www.html.cn/doc/lodash/#_mergeobject-sources
    option: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    chartOption() {
      if (!((this.xData?.length || this.option?.yAxis) && this.series?.length)) {
        return
      }
      let option

      let series = []
      let seriesData = this.series
      Array.isArray(this.series[0]) || (seriesData = [seriesData])
      seriesData.forEach((data, index) => {
        let obj = {
          name: this.legend[index],
          type: 'bar',
          stack: this.stack,
          // barWidth: this.stack ? 55 : 20, // 柱图宽度
          barMaxWidth: 50,
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
          },
          emphasis: {
            focus: 'series',
          },
          data,
        }
        series.push(obj)
      })

      echartColors.slice('1', 1)
      option = {
        // title: {
        //   text: 'Stacked Area Chart'
        // },
        tooltip: {
          // trigger: 'axis',
          // backgroundColor: '#505050',
          // borderWidth: 0,
          // textStyle: {
          //   color: '#fff',
          // },
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985',
          //   },
          // },
        },
        legend: {
          data: this.legend,
          x: 'center',
          y: 'bottom',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
        },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '40px',
          top: '20px',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.xData,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置。
              // interval: 0,
              color: 'rgba(153, 153, 153, 1)', // 横坐标字体颜色
            },
            axisTick: {
              // 横坐标刻度
              alignWithLabel: true,
              show: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisTick: {
              // 横坐标刻度
              alignWithLabel: true,
              show: true,
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置。
              // interval: 0,
              color: 'rgba(153, 153, 153, 1)', // 坐标字体颜色
            },
          },
        ],
        series,
      }
      this.option && merge(option, this.option)
      return option
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<template>
  <BaChart class="ChartBar" :option="chartOption" />
</template>

<style lang="scss" scoped></style>
