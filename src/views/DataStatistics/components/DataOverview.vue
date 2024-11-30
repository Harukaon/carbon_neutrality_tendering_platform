<template>
  <div class="data-overview">
    <div ref="mixChartRef" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { getAllMonthlyPerformances } from '@/api/api'

// 定义响应式引用
const mixChartRef = ref(null)
const chart = ref(null)

// 处理图表数据
const processChartData = (data) => {
  // 提取月份
  const months = data.map(item => item.month.split('-')[1] + '月')
  // 提取访问量
  const visits = data.map(item => item.visits)
  // 提取订单量
  const orders = data.map(item => item.orders)
  // 计算转化率
  const conversion = data.map(item => ((item.orders / item.visits) * 100).toFixed(1))

  return { months, visits, orders, conversion }
}

// 初始化图表方法
const initChart = async () => {
  // 获取当前是否为深色模式
  const isDark = document.documentElement.classList.contains('dark')
  
  // 定义深色模式和浅色模式的颜色变量
  const textColor = isDark ? '#e5e7eb' : '#374151'
  const axisLineColor = isDark ? 'rgba(229, 231, 235, 0.2)' : '#e5e7eb'
  
  chart.value = echarts.init(mixChartRef.value)
  
  try {
    // 获取数据
    const data = await getAllMonthlyPerformances()
    const { months, visits, orders, conversion } = processChartData(data)
    
    // 图表配置
    const option = {
      title: {
        text: '数据总览',
        textStyle: {
          color: textColor
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: textColor
          }
        }
      },
      legend: {
        data: ['访问量', '订单量', '转化率'],
        textStyle: {
          color: textColor
        }
      },
      xAxis: {
        type: 'category',
        data: months,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: axisLineColor
          }
        },
        axisLabel: {
          color: textColor
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '数量',
          min: 0,
          interval: 50,
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          },
          axisLabel: {
            color: textColor
          },
          splitLine: {
            lineStyle: {
              color: axisLineColor
            }
          }
        },
        {
          type: 'value',
          name: '转化率',
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          },
          axisLabel: {
            formatter: '{value}%',
            color: textColor
          },
          splitLine: {
            lineStyle: {
              color: axisLineColor
            }
          }
        }
      ],
      series: [
        {
          name: '访问量',
          type: 'bar',
          data: visits
        },
        {
          name: '订单量',
          type: 'bar',
          data: orders
        },
        {
          name: '转化率',
          type: 'line',
          yAxisIndex: 1,
          data: conversion
        }
      ]
    }
    
    chart.value.setOption(option)
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 调整图表大小方法
const resizeChart = () => {
  chart.value?.resize()
}

// 添加深色模式变化监听
const updateChartTheme = () => {
  if (chart.value) {
    initChart()
  }
}

// 监听主题变化的函数
const watchDarkMode = () => {
  // 创建一个 MutationObserver 来监听 html 标签的 class 变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateChartTheme()
      }
    })
  })

  // 开始观察 html 标签的 class 变化
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  return observer
}

let themeObserver = null

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
  // 启动主题观察器
  themeObserver = watchDarkMode()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  // 清理主题观察器
  if (themeObserver) {
    themeObserver.disconnect()
  }
  // 销毁图表实例
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>

<style lang="scss" scoped>
.data-overview {
  padding: 20px;
  
  .chart {
    height: 400px;
    width: 100%;
    background: transparent;
  }
}
</style>
