<template>
  <div class="energy-consumption-ratio">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getUsageData } from '@/api/api'

// 图表DOM引用
const chartRef = ref(null)
let chart = null

// 存储实际数据
const energyData = ref([])
const total = ref(0)

// 获取实际数据的方法
const fetchData = async () => {
  try {
    const data = await getUsageData()
    energyData.value = data
    // 重新计算总量
    total.value = data.reduce((sum, item) => sum + item.value, 0)
    // 获取数据后重新初始化图表
    initChart()
  } catch (error) {
    console.error('获取能耗数据失败:', error)
  }
}

// 初始化图表配置
const initChart = () => {
  if (!chartRef.value) return
  
  nextTick(() => {
    if (chart) {
      chart.dispose()
    }
    
    chart = echarts.init(chartRef.value)
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return `${params.seriesName}<br/>
                  ${params.name}: ${params.value} ${energyData.value.find(item => item.name === params.name)?.unit}<br/>
                  占比: ${params.percent}%`
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: '#00ffff',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        orient: 'vertical',
        left: 20,
        top: 'center',
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle',
        textStyle: {
          fontSize: 12,
          color: '#a8c8d8'
        }
      },
      color: [
        '#00c6ff',  // 亮蓝
        '#0066ff',  // 深蓝
        '#00a8b3',  // 青蓝
        '#0088ff'   // 中蓝
      ],
      series: [
        {
          name: '能耗占比',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 2,
            borderColor: '#fff',
            borderWidth: 1,
            opacity: 0.95
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{d}%',
            fontSize: 12,
            color: '#a8c8d8'
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 8,
            smooth: true,
            lineStyle: {
              color: 'rgba(168, 200, 216, 0.5)'
            }
          },
          data: energyData.value.map(item => ({
            name: item.name,
            value: item.value
          }))
        }
      ],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `能耗和\n${total.value}`,
          fontSize: 16,
          fontWeight: 'normal',
          textAlign: 'center',
          fill: '#00c6ff'
        }
      }
    }

    chart.setOption(option)
  })
}

// 监听窗口大小变化
const handleResize = () => {
  chart && chart.resize()
}

onMounted(() => {
  // 使用nextTick确保DOM已渲染
  nextTick(() => {
    fetchData() // 获取实际数据
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  chart && chart.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.energy-consumption-ratio {
  width: 100%;
  height: 100%;
  min-height: 250px; /* 添加最小高度 */
  display: flex;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: inherit; /* 继承父元素的最小高度 */
}
</style>
