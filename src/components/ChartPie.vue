<script>
import merge from 'lodash.merge'

export default {
  // 饼图
  name: 'ChartPie',
  components: {},
  props: {
    // 图例
    legend: {
      type: Array,
      default: () => [],
    },
    // 展示数据集
    series: {
      type: Array,
      default: () => [
        // { value: 484, name: 'Union Ads' },
        // { value: 300, name: 'Video Ads' },
      ],
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
      // eslint-disable-next-line
      if (!this.series?.length) {
        return
      }
      let option = {
        // title: {
        //   text: 'Stacked Area Chart',
        //   left: 'center',
        //   top: 'bottom'
        // },
        tooltip: {
          trigger: 'item',
          // textStyle: {
          //   color: '#FFF', // 设置文字颜色
          //   fontSize: 12,
          // },
          // backgroundColor: '#505050',
          // borderWidth: 0,
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985',
          //   },
          // },
        },
        legend: {
          x: 'center',
          y: '88%',
          // selectedMode: false,
          type: 'scroll', // 分页类型
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          tooltip: {
            show: true,
          },
          textStyle: {
            color: '#36363A',
            fontSize: 12,
            lineHeight: 14,
          },
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '20px',
          top: '30px',
          containLabel: true,
        },
        series: {
          type: 'pie',
          radius: '50%',
          data: this.series,
          radius: ['40%', '70%'],
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
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
  <BaChart class="ChartPie" :option="chartOption" />
</template>

<style lang="scss" scoped></style>
