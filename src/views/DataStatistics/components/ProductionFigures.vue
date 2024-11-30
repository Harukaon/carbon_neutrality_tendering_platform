<template>
  <div class="production-figures">
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue'
import { getAllProductionPlans } from '@/api/api'

const chartRef = ref(null)
let chart = null

// 获取主题颜色配置
const getThemeColors = () => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    textColor: isDark ? '#e5e7eb' : '#374151', // 对应 Tailwind 的 gray-200 和 gray-700
  }
}

// 存储处理后的数据
const chartData = ref({
  dates: [],
  production: [],
  target: []
})

// 获取并处理数据
const fetchData = async () => {
  try {
    const data = await getAllProductionPlans()
    // 处理数据
    chartData.value = {
      dates: data.map(item => item.date.substring(5)), // 只显示月份
      production: data.map(item => item.production),
      target: data.map(item => item.target)
    }
    // 更新图表
    initChart()
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 初始化图表配置
const initChart = () => {
  const themeColors = getThemeColors()
  const option = {
    title: {
      text: '月度生产统计',
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
    legend: {
      bottom: '5%',
      data: ['实际产量', '目标产量'],
      textStyle: {
        color: themeColors.textColor
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.value.dates,
      axisLabel: {
        color: themeColors.textColor
      }
    },
    yAxis: {
      type: 'value',
      name: '产量',
      axisLabel: {
        color: themeColors.textColor
      },
      nameTextStyle: {
        color: themeColors.textColor
      }
    },
    series: [
      {
        name: '实际产量',
        type: 'bar',
        data: chartData.value.production,
        itemStyle: {
          color: '#91cc75'
        }
      },
      {
        name: '目标产量',
        type: 'line',
        data: chartData.value.target,
        itemStyle: {
          color: '#ee6666'
        }
      }
    ]
  }

  if (chartRef.value) {
    if (chart) {
      chart.dispose()
    }
    chart = echarts.init(chartRef.value)
    chart.setOption(option)

    // 监听主题变化
    const observer = new MutationObserver(() => {
      const newThemeColors = getThemeColors()
      chart.setOption({
        title: {
          textStyle: {
            color: newThemeColors.textColor
          }
        },
        legend: {
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
          },
          nameTextStyle: {
            color: newThemeColors.textColor
          }
        }
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
}

// 监听窗口大小变化
const handleResize = () => {
  chart && chart.resize()
}

onMounted(() => {
  fetchData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart && chart.dispose()
})
</script>

<style scoped>
.production-figures {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 220px;
}
</style>
