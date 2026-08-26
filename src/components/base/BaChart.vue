<script setup lang="ts">
import * as echarts from 'echarts'
import { echartColors } from '@/utils/common'
import merge from 'lodash.merge'

const props = defineProps({
  // 自定义图表配置项，使用loadsh.merge(origin, option)和原有的配置进行覆盖合并
  // loadsh.merge: https://www.html.cn/doc/lodash/#_mergeobject-sources
  option: {
    type: Object,
    default: null,
  },
})

const chart = ref(null)
watch(
  () => props.option,
  (val) => {
    nextTick(() => {
      drawChart()
    })
  },
  { immediate: true },
)

function drawChart() {
  const myChart = echarts.init(chart.value)
  let option = {
    color: echartColors,
  }
  props.option && myChart.setOption(merge(option, props.option))
  new ResizeObserver((entries) => {
    myChart.resize()
  }).observe(chart.value)
}
</script>

<template>
  <div v-if="option" ref="chart" class="BaChart chart"></div>
  <div v-else class="BaChart chart">
    <div class="centerCenter"><BaEmpty /></div>
  </div>
</template>

<style lang="css" scoped>
.chart {
  position: relative;
  max-height: 100%;
  min-width: var(--chartMinWidth, --chartMinHeight, 400px);
  min-height: var(--chartMinHeight, 400px);
}
</style>
