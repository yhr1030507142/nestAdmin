<script>
import * as echarts from 'echarts'
import chinaJson from './china.json'
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
    data: {
      deep: true,
      handler() {
        this.chart.setOption(this.chartOption)
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
    return {
      chart: null,
      dataList: [
        { name: '南海诸岛' },
        { ename: 'beijing', name: '北京' },
        { ename: 'tianjin', name: '天津' },
        { ename: 'shanghai', name: '上海' },
        { ename: 'chongqing', name: '重庆' },
        { ename: 'hebei', name: '河北' },
        { ename: 'henan', name: '河南' },
        { ename: 'yunnan', name: '云南' },
        { ename: 'liaoning', name: '辽宁' },
        { ename: 'heilongjiang', name: '黑龙江' },
        { ename: 'hunan', name: '湖南' },
        { ename: 'anhui', name: '安徽' },
        { ename: 'shandong', name: '山东' },
        { ename: 'xinjiang', name: '新疆' },
        { ename: 'jiangsu', name: '江苏' },
        { ename: 'zhejiang', name: '浙江' },
        { ename: 'jiangxi', name: '江西' },
        { ename: 'hubei', name: '湖北' },
        { ename: 'guangxi', name: '广西' },
        { ename: 'gansu', name: '甘肃' },
        { ename: 'shanxi', name: '山西' },
        { ename: 'neimenggu', name: '内蒙古' },
        { ename: 'shanxi1', name: '陕西' },
        { ename: 'jilin', name: '吉林' },
        { ename: 'fujian', name: '福建' },
        { ename: 'guizhou', name: '贵州' },
        { ename: 'guangdong', name: '广东' },
        { ename: 'qinghai', name: '青海' },
        { ename: 'xizang', name: '西藏' },
        { ename: 'sichuan', name: '四川' },
        { ename: 'ningxia', name: '宁夏' },
        { ename: 'hainan', name: '海南' },
        { name: '台湾' },
        { ename: 'xianggang', name: '香港' },
        { ename: 'aomen', name: '澳门' },
      ],
    }
  },
  computed: {
    chartOption() {
      // console.log('this.Datas', this.Datas.data)
      // console.log('this.dataList', this.dataList)
      let dataList = this.dataList
      let max = 0
      for (let i = 0; i < dataList.length; i++) {
        for (let q = 0; q < this.data.length; q++) {
          if (this.data[q].name?.substring(0, 2) == dataList[i].name.substring(0, 2)) {
            dataList[i].value ??= 0
            dataList[i].value += +this.data[q].value
            // console.log(' dataList[i].value', dataList[i].value)
            if (dataList[i].value > max) {
              max = dataList[i].value
            }
            // break
          }
        }
      }
      max = max + 5
      echarts.registerMap('china', chinaJson)
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
          // text: ['高', '低'],
        },
        geo: {
          map: 'china', //引入地图数据
          roam: false, //不开启缩放和平移
          zoom: 1, //视角缩放比例
          label: {
            normal: {
              show: true,
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
            name: '省份',
            type: 'map',
            geoIndex: 0,
            data: this.dataList,
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

      this.chart.on('click', (params) => {
        if (!params.data.ename) {
          alert('暂无' + params.name + '地图数据')
          return
        }
        this.$emit('Fparams', params)
      })
    },
  },
  mounted() {
    this.initEchart()
  },
}
</script>
