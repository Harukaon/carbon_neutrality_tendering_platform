<template>
  <div class="sales-rank">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getAllSalespersons } from '@/api/api'

// 图表实例
let chartInstance = null
const chartRef = ref(null)

// 销售数据状态
const salesData = ref([])

// 获取主题颜色配置
const getThemeColors = () => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    textColor: isDark ? '#e5e7eb' : '#374151', // 对应 Tailwind 的 gray-200 和 gray-700
  }
}

// 获取销售数据
const fetchSalesData = async () => {
  try {
    const data = await getAllSalespersons()
    salesData.value = data.sort((a, b) => b.value - a.value)
    initChart()
  } catch (error) {
    console.error('获取销售数据失败:', error)
  }
}

// 初始化图表配置
const initChart = () => {
  const themeColors = getThemeColors()
  const option = {
    title: {
      text: '销售人员业绩排名',
      left: 'center',
      textStyle: {
        color: themeColors.textColor
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: themeColors.textColor,
        formatter: '{value} 元'
      }
    },
    yAxis: {
      type: 'category',
      data: salesData.value.map(item => item.name),
      inverse: true,
      axisLabel: {
        color: themeColors.textColor
      }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: salesData.value.map(item => item.value),
        label: {
          show: true,
          position: 'right',
          formatter: '{c} 元',
          color: themeColors.textColor
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }
    ]
  }
  
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(option)

  // 监听主题变化
  const observer = new MutationObserver(() => {
    const newThemeColors = getThemeColors()
    chartInstance.setOption({
      title: {
        textStyle: {
          color: newThemeColors.textColor
        }
      },
      xAxis: {
        axisLabel: {
          color: newThemeColors.textColor
        }
      },
      yAxis: {
        axisLabel: {
          color: newThemeColors.textColor
        }
      },
      series: [{
        label: {
          color: newThemeColors.textColor
        }
      }]
    })
  })

  // 观察 html 标签的 class 变化
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  // 在组件卸载时清理
  onUnmounted(() => {
    observer.disconnect()
  })
}

// 监听窗口大小变化
const handleResize = () => {
  chartInstance && chartInstance.resize()
}

onMounted(() => {
  fetchSalesData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.sales-rank {
  width: 100%;
  height: 100%;
}

.chart-container {
  width: 100%;
  min-height: 250px;
  height:100%;
}
</style>
