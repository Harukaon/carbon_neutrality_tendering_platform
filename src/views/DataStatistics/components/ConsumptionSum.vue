<template>
  <div class="">
    <div class="dashboard-container">
      <div class="gauge-row">
        <div id="electricity" class="gauge-chart"></div>
        <div id="water" class="gauge-chart"></div>
      </div>
    </div>
    <div class="flex justify-center">
      <div id="carbon" class="gauge-chart"></div>
    </div>
    <div class="flex justify-center text-sm dark:text-gray-200">
      能耗总览
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getOverviewData } from '@/api/api'
// 图表实例
const electricityChart = ref(null)
const waterChart = ref(null)
const carbonChart = ref(null)

// 数据
const electricityValue = ref(0)
const waterValue = ref(0)
const carbonValue = ref(0)

// 获取仪表盘配置
const getGaugeOption = (value, name, unit, color) => {
  // 判断是否为深色模式
  const isDarkMode = document.documentElement.classList.contains('dark')
  const textColor = isDarkMode ? '#E5E7EB' : '#666' // 文字颜色
  const detailColor = isDarkMode ? '#E5E7EB' : '#333' // 数值颜色
  const axisLineColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' // 轴线颜色

  return {
    backgroundColor: 'transparent', // 设置透明背景
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '60%'],
      min: 0,
      max: value * 1.5,
      radius: '55px',
      progress: {
        show: true,
        roundCap: true,
        width: 12
      },
      pointer: {
        show: false
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 12,
          color: [[1, axisLineColor]] // 设置轴线颜色
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: true,
        offsetCenter: [0, '35%'],
        fontSize: 12,
        color: textColor
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '-5%'],
        formatter: function(value) {
          return value + unit
        },
        color: detailColor,
        fontSize: 14,
        fontWeight: 'bold'
      },
      data: [{
        value: value,
        name: name,
        itemStyle: {
          color: color
        }
      }]
    }]
  }
}

// 初始化图表
const initCharts = () => {
  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1

  // 初始化时传入设备像素比配置
  electricityChart.value = echarts.init(document.getElementById('electricity'), null, {
    devicePixelRatio: dpr,
    renderer: 'canvas'
  })
  waterChart.value = echarts.init(document.getElementById('water'), null, {
    devicePixelRatio: dpr,
    renderer: 'canvas'
  })
  carbonChart.value = echarts.init(document.getElementById('carbon'), null, {
    devicePixelRatio: dpr,
    renderer: 'canvas'
  })
  
  updateCharts()
}

// 更新图表数据
const updateCharts = () => {
  electricityChart.value?.setOption(getGaugeOption(
    electricityValue.value,
    '耗电量',
    'kWh',
    '#FF6B6B'
  ))
  
  waterChart.value?.setOption(getGaugeOption(
    waterValue.value,
    '耗水量',
    'm³',
    '#4ECDC4'
  ))
  
  carbonChart.value?.setOption(getGaugeOption(
    carbonValue.value,
    '碳排放',
    'kg',
    '#45B7D1'
  ))
}

// 处理窗口大小变化
const handleResize = () => {
  electricityChart.value?.resize()
  waterChart.value?.resize()
  carbonChart.value?.resize()
}

// 获取数据的方法
const fetchData = async () => {
  try {
    const data = await getOverviewData()
    // 直接使用返回的数据数组
    data.forEach(item => {
      switch (item.description) {
        case 'electricity':
          electricityValue.value = item.value
          break
        case 'water':
          waterValue.value = item.value
          break
        case 'carbon':
          carbonValue.value = item.value
          break
      }
    })
    // 更新图表
    updateCharts()
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 声明 observer 变量
let observer = null

// 添加深色模式监听
const updateDarkMode = () => {
  // 如果已经存在观察器，先断开连接
  if (observer) {
    observer.disconnect()
  }

  // 创建新的观察器
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateCharts() // 当模式改变时更新图表
      }
    })
  })

  // 开始观察 html 标签的 class 变化
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
}

// 修改生命周期钩子
onMounted(() => {
  initCharts()
  fetchData()
  updateDarkMode() // 添加深色模式监听
})

// 在组件卸载时清理观察器
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('resize', handleResize)
  electricityChart.value?.dispose()
  waterChart.value?.dispose()
  carbonChart.value?.dispose()
})
</script>

<style scoped>
.dashboard-container {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
}

.gauge-row {
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  gap: 10px;
}

.gauge-chart {
  width: 100%;
  height: 100%;
  min-height: 100px;
}

/* 添加深色模式样式 */
:deep(.dark) .gauge-chart {
  background-color: transparent;
}
</style>