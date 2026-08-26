<script>
import * as echarts from 'echarts'
import worldJson from './world.json'
import merge from 'lodash.merge'
export default {
  render: function () {
    return h('div', {
      ref: 'chart',
      style: {
        'min-height': '350px',
        'min-width': '200px',
        margin: 'auto',
      },
    })
  },
  watch: {
    chartOption: {
      deep: true,
      handler() {
        this.chart.setOption(this.chartOption)

        // this.initEchart()
      },
    },
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    // 自定义图表配置项，使用loadsh.merge(origin, option)和原有的配置进行覆盖合并
    // loadsh.merge: https://www.html.cn/doc/lodash/#_mergeobject-sources
    option: {
      type: Object,
      default: null,
    },
  },
  data() {
    return { chart: null }
  },
  computed: {
    chartOption() {
      // console.log('this.Datas', this.Datas.data)
      // console.log('this.dataList', this.dataList)
      let dataList = worldJson.features.map((item) => ({
        name: item.properties.name,
        countryCode: item.properties.country,
        value: undefined,
      }))
      let max = 0
      for (let i = 0; i < dataList.length; i++) {
        for (let q = 0; q < this.data.length; q++) {
          if (this.data[q].countryCode == dataList[i].countryCode) {
            dataList[i].value ??= 0
            dataList[i].value += +this.data[q].value
            // console.log(' dataList[i].value', dataList[i].value)
            if (dataList[i].value > max) {
              max = dataList[i].value
            }
            break
          }
        }
      }
      max = max + 5
      echarts.registerMap('world', worldJson)
      var option = {
        tooltip: {
          //数据格式化
          // formatter: function (params, callback) {
          //   return params.seriesName + '<br />' + params.name + '：' + (params.value || 0)
          // },
        },
        visualMap: {
          min: 1,
          max: max,
          left: 'left',
          top: 'bottom',
          inRange: {
            color: ['#313695', 'hsl(345, 82%, 54%)'], //取值范围的颜色
          },
          show: true, //图注
          text: ['高' + max, '低 1'],
        },
        geo: {
          map: 'world', //引入地图数据
          roam: false, //不开启缩放和平移
          zoom: 1, //视角缩放比例
          label: {
            normal: {
              // show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)',
            },
          },
          // 鼠标悬浮提示框
          itemStyle: {
            normal: {
              areaColor: '#d3f5ff', //地图区域颜色
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              //高亮的显示设置
              areaColor: 'skyblue', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [
          {
            name: 'country',
            type: 'map',
            geoIndex: 0,
            data: dataList,
          },
        ],
      }
      this.option && merge(option, this.option)
      return option
    },
  },
  methods: {
    initEchart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.chartOption)

      new ResizeObserver((entries) => {
        this.chart.resize()
      }).observe(this.$refs.chart)
    },
  },
  mounted() {
    this.initEchart()
  },
}
</script>
