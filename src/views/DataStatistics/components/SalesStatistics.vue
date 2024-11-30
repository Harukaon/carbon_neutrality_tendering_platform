<template>
  <div class="sales-statistics">
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { watch } from 'vue'
import { getAllSalesStatistics } from '@/api/api'

const chartRef = ref(null)
let chartInstance = null

// 实际数据状态
const salesData = ref({
  dates: [],
  series: [{
    name: '销售额',
    data: []
  }]
})

// 获取销售数据
const fetchSalesData = async () => {
  try {
    const data = await getAllSalesStatistics()
    // 处理API返回的数据
    salesData.value = {
      dates: data.map(item => new Date(item.date).toLocaleDateString('zh-CN', { month: 'long' })),
      series: [{
        name: '销售额',
        data: data.map(item => item.sales)
      }]
    }
    // 更新图表
    chartInstance?.setOption(initChartOption())
  } catch (error) {
    console.error('获取销售数据失败:', error)
  }
}

// 获取主题颜色配置
const getThemeColors = () => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    textColor: isDark ? '#e5e7eb' : '#374151', // 对应 Tailwind 的 gray-200 和 gray-700
  }
}

// 修改 initChartOption 函数
const initChartOption = () => {
  const themeColors = getThemeColors()
  return {
    title: {
      text: '销售统计',
      left: 'center',
      textStyle: {
        color: themeColors.textColor
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['销售额'],
      bottom: '0%',
      textStyle: {
        color: themeColors.textColor
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: salesData.value.dates,
      axisLabel: {
        color: themeColors.textColor
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: themeColors.textColor
      }
    },
    // 工具箱配置
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    // 网格配置
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    // 系列配置
    series: [
      {
        name: '销售额',
        type: 'line',
        stack: '总量',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.1)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: salesData.value.series[0].data
      }
    ]
  }
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    fetchSalesData()  // 获取并加载实际数据

    // 监听主题变化
    const observer = new MutationObserver(() => {
      const newThemeColors = getThemeColors()
      chartInstance.setOption({
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
          }
        }
      })
    })

    // 观察 html 标签的 class 变化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 在组件卸载时清理
    onUnmounted(() => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      chartInstance?.dispose()
    })
  }
}

// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
})
</script>

<style scoped>
.sales-statistics {
  width: 100%;
  height: 100%;
}

.chart-container {
  width: 100%;
  min-height: 230px;
  height: 100%;
}
</style>
