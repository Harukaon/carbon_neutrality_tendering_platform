<template>
  <div class="inventory-warning">
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { getAllProducts } from '@/api/api'

export default {
  name: 'InventoryWarning',
  setup() {
    const chartRef = ref(null)
    let chart = null
    
    // 添加暗黑模式判断
    const isDarkMode = ref(document.documentElement.classList.contains('dark'))

    // 监听暗黑模式变化
    const watchDarkMode = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            isDarkMode.value = document.documentElement.classList.contains('dark')
            chart && initChart() // 重新渲染图表
          }
        })
      })
      
      observer.observe(document.documentElement, {
        attributes: true
      })
      
      return observer
    }

    // 修改图表配置函数
    const initChartData = (productsData) => {
      // 定义暗黑模式下的颜色变量
      const textColor = isDarkMode.value ? '#e5e7eb' : '#333' // gray-200 : 暗灰色
      const axisLineColor = isDarkMode.value ? '#4b5563' : '#999' // gray-600
      const splitLineColor = isDarkMode.value ? '#374151' : '#eee' // gray-700

      return {
        title: {
          text: '库存预警统计',
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor
          },
          top: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['库存量', '预警线'],
          bottom: 20,
          itemWidth: 15,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            color: textColor
          }
        },
        grid: {
          top: 80,
          bottom: 60,
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: productsData.products.map(item => item.name),
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          },
          axisLabel: {
            fontSize: 12,
            interval: 0,
            color: textColor
          }
        },
        yAxis: {
          type: 'value',
          name: '数量',
          nameTextStyle: {
            fontSize: 12,
            padding: [0, 0, 0, 40],
            color: textColor
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: splitLineColor
            }
          },
          axisLabel: {
            fontSize: 12,
            color: textColor
          },
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          }
        },
        series: [
          {
            name: '库存量',
            type: 'bar',
            data: productsData.products.map(item => item.inventory),
            barWidth: '40%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: isDarkMode.value ? [
                  { offset: 0, color: '#3b82f6' },  // blue-500
                  { offset: 1, color: '#1d4ed8' }   // blue-700
                ] : [
                  { offset: 0, color: '#83bff6' },
                  { offset: 1, color: '#188df0' }
                ]
              },
              borderRadius: [4, 4, 0, 0]
            }
          },
          {
            name: '预警线',
            type: 'line',
            data: Array(productsData.products.length).fill(productsData.warningLine),
            itemStyle: {
              color: isDarkMode.value ? '#ef4444' : '#ff7675' // red-500 : 原色
            },
            lineStyle: {
              type: 'dashed',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 8,
          }
        ]
      }
    }

    // 初始化图表
    const initChart = async () => {
      if (chartRef.value) {
        chart = echarts.init(chartRef.value)
        try {
          // 获取真实数据
          const data = await getAllProducts()
          const options = initChartData(data)
          chart.setOption(options)
        } catch (error) {
          console.error('获取产品数据失败:', error)
        }
      }
    }

    // 监听窗口大小变化
    const handleResize = () => {
      chart && chart.resize()
    }

    onMounted(() => {
      initChart()
      window.addEventListener('resize', handleResize)
      const observer = watchDarkMode() // 启动暗黑模式监听
      
      // 清理观察器
      onUnmounted(() => {
        chart && chart.dispose()
        window.removeEventListener('resize', handleResize)
        observer.disconnect()
      })
    })

    return {
      chartRef
    }
  }
}
</script>

<style lang="scss" scoped>
.inventory-warning {
  width: 100%;
  height: 100%;
  padding: 20px; 

}
.chart-container {
    width: 100%;
    height:100%;
    min-height: 230px;
  }
</style>
