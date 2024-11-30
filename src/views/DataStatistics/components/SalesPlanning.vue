<template>
  <div class="sales-planning">
    <div ref="mainChart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import { getAllSalesPlans } from '@/api/api'

const mainChart = ref(null)
let chartInstance = null

// 添加主题色配置
const getThemeColors = () => {
  // 判断是否为暗色模式
  const isDark = document.documentElement.classList.contains('dark')
  return {
    textColor: isDark ? '#e5e7eb' : '#374151', // 对应 Tailwind 的 gray-200 和 gray-700
  }
}

// 获取销售计划数据
const fetchSalesData = async () => {
  try {
    const data = await getAllSalesPlans()
    return {
      months: data.map(item => item.month.split('-')[1] + '月'),
      actualSales: data.map(item => item.actualSales),
      plannedSales: data.map(item => item.plannedSales),
      // 计算完成率
      completionRate: data.map(item => ((item.actualSales / item.plannedSales) * 100).toFixed(1))
    }
  } catch (error) {
    console.error('获取销售计划数据失败:', error)
    return null
  }
}

const initChart = async () => {
  if (!mainChart.value) return

  // 销毁旧实例
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }

  // 创建新实例
  chartInstance = echarts.init(mainChart.value)
  
  // 获取真实数据
  const salesData = await fetchSalesData()
  if (!salesData) return

  const themeColors = getThemeColors()
  
  const option = {
    title: {
      text: '销售计划',
      bottom: 0,
      left: 'center',
      textStyle: {
        color: themeColors.textColor
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>'
        params.forEach(item => {
          let marker = item.marker
          let value = item.seriesName === '完成率' ? item.value + '%' : '¥' + item.value + '万'
          result += marker + item.seriesName + ': ' + value + '<br/>'
        })
        return result
      }
    },
    legend: {
      data: ['实际销售额', '计划销售额', '完成率'],
      textStyle: {
        color: themeColors.textColor
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: salesData.months,
      axisLabel: {
        color: themeColors.textColor
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额',
        min: 0,
        axisLabel: {
          formatter: '¥{value}万',
          color: themeColors.textColor
        },
        nameTextStyle: {
          color: themeColors.textColor
        }
      },
      {
        type: 'value',
        name: '完成率',
        min: 0,
        max: 200,
        axisLabel: {
          formatter: '{value}%',
          color: themeColors.textColor
        },
        nameTextStyle: {
          color: themeColors.textColor
        }
      }
    ],
    series: [
      {
        name: '实际销售额',
        type: 'line',
        smooth: true,
        symbolSize: 8,
        areaStyle: {
          opacity: 0.3,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.7)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
          ])
        },
        lineStyle: {
          width: 3,
          color: '#409EFF'
        },
        itemStyle: {
          color: '#409EFF'
        },
        data: salesData.actualSales
      },
      {
        name: '计划销售额',
        type: 'line',
        smooth: true,
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#909399'
        },
        itemStyle: {
          color: '#909399'
        },
        data: salesData.plannedSales
      },
      {
        name: '完成率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#67C23A'
        },
        itemStyle: {
          color: '#67C23A'
        },
        data: salesData.completionRate
      }
    ]
  }

  chartInstance.setOption(option)

  const handleResize = () => {
    chartInstance && chartInstance.resize()
  }

  window.addEventListener('resize', handleResize)

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
      yAxis: [
        {
          axisLabel: {
            color: newThemeColors.textColor
          },
          nameTextStyle: {
            color: newThemeColors.textColor
          }
        },
        {
          axisLabel: {
            color: newThemeColors.textColor
          },
          nameTextStyle: {
            color: newThemeColors.textColor
          }
        }
      ],
      legend: {
        textStyle: {
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

  // 清理函数
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
    observer.disconnect()
  })
}

onMounted(() => {
  initChart()
})
</script>

<style lang="scss" scoped>
.sales-planning {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.chart-container {
  width: 100%;
  height: 400%;
  min-height: 300px;
}
</style>
